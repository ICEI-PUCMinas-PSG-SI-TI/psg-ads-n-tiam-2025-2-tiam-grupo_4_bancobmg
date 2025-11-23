import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";

// --- IMPORTS DO FIREBASE ---
import { Timestamp, doc, addDoc, updateDoc, collection, query, where, getDocs, limit } from "firebase/firestore";
import { auth, db } from "../../firebaseConfig"; // Importa auth e db do seu config

export default function ADMHomeScreen() {

  //Dados
  const [QtdeUsuarios, setQtdeUsuarios] = useState(0);
  const [QtdeUsuariosComSaldo, setQtdeUsuariosComSaldo] = useState(0);
  const [QtdeUsuariosSacaram, setQtdeUsuariosSacaram] = useState(0);
  const [QtdeUsuariosNaoAutorizados, setQtdeUsuariosNaoAutorizados] = useState(0);
  const [SaldoGerado, setSaldoGerado] = useState(0);

  const [SelectedDate, setSelectedDate] = useState(new Date().toLocaleDateString('pt-BR'));

  const [RelatorioTexto, setRelatorioTexto] = useState("Relatório Atual (" + SelectedDate + ")");
  const [ErrorText, setErrorText] = useState("");

  useEffect(() =>
  {
    RefreshAndStoreToday();
  }, [])

  const handleDateChange = (date: string) => {
    if (date.length == 2 || date.length == 5)
      date += "/";
    setSelectedDate(date);
  }

  const LoadRelatorio = async (date: string) => {
    if (date.length < 10)
    {
      setErrorText("Data Inválida");
      return;
    }

    const [day, month, year] = date.split('/').map(Number);
    const SearchDate = new Date(year, month - 1, day);

    console.log("Loading report from " + SearchDate.toLocaleDateString("pt-br"));

    const today = new Date();

    if (SameDate(SearchDate, today)) // Relatório do dia atual
    {
      RefreshAndStoreToday();
    }
    else
    {
      // TODO: Fazer busca de relatório a partir da data especificada
      const relatoriosDB = collection(db, "relatorios");
      let q = query(relatoriosDB);
      const res = await getDocs(q);

      if (!res.empty)
      {
        const start = new Date(SearchDate);
        start.setHours(0, 0, 0, 0);

        const end = new Date(SearchDate);
        end.setHours(23, 59, 59, 999);

        // busca por data entre esses horários para não ter problemas de encontrar.
        const q = query(
          relatoriosDB,
          where("data", ">=", start),
          where("data", "<=", end),
          limit(1)
        );
        const r = await getDocs(q);
        if (!r.empty)
        {
          const relatorio = r.docs[0].data();
          console.log(relatorio);
          setQtdeUsuarios(relatorio.qtde_clientes);
          setQtdeUsuariosComSaldo(relatorio.qtde_cliente_com_saldo);
          setQtdeUsuariosNaoAutorizados(relatorio.qtde_clientes_nao_autorizados);
          setQtdeUsuariosSacaram(relatorio.qtde_clientes_sacaram);
          setSaldoGerado(relatorio.saldo_gerado);

          setSelectedDate(date);
          setRelatorioTexto("Relatório de " + SelectedDate);

          setErrorText("");
        }
        else
        {
          setErrorText("Relatório não encontrado para esta data.");
        }
      }
      else
      {
        setErrorText("Não há relatórios salvos");
      }
    
      
    }
  };

  const RefreshAndStoreToday = async () =>
  {
    try
    {
      const date = new Date().toLocaleDateString("pt-br");
      const start = new Date();
      start.setHours(0, 0, 0, 0);

      const end = new Date();
      end.setHours(23, 59, 59, 999);

      // Quantidade Total de Clientes
      const clientDB = collection(db, "clientes");
      let q = query(clientDB);
      const AllClients = await getDocs(q);
      console.log("Clientes OK! " + AllClients.size);

      // Quantidade de Clientes com Saldo
      const saldoDB = collection(db, "saldos_fgts");
      q = query(saldoDB);
      const saldos = await getDocs(q);
      const groupedSaldos: { [key: string]: number } = {};

      saldos.forEach(doc => {
        const data = doc.data();
        const clientId = data.id_cliente;
        if (data.valor > 0)
        {
          if (!groupedSaldos[clientId])
            groupedSaldos[clientId] = 0;

          groupedSaldos[clientId]++;
        }
      });
      const ClientesComSaldo = Object.keys(groupedSaldos).length;

      console.log("Com Saldo OK! " + ClientesComSaldo);

      // Quantidade de Clientes Não Autorizados
      const solicitacoesDB = collection(db, "solicitacoes_saque");
      q = query(solicitacoesDB, where("status", "==", "NEGADO"));
      const solNegados = await getDocs(q);
      const groupedNegados: { [key: string]: number } = {};

      solNegados.forEach(doc => {
        const data = doc.data();
        const clientId = data.id_cliente;
        if (!groupedNegados[clientId])
          groupedNegados[clientId] = 0;

        groupedNegados[clientId]++;
      });
      const ClientesNegados = Object.keys(groupedNegados).length;

      console.log("Negados OK! " + ClientesNegados);

      // Clientes que Sacaram
      q = query(solicitacoesDB, where("status", "==", "PENDENTE"), where("data_solicitacao", ">=", start));
      const solAceitos = await getDocs(q);
      const groupedAceitos: { [key: string]: number } = {};

      solAceitos.forEach(doc => {
        const data = doc.data();
        const clientId = data.id_cliente;
        if (!groupedAceitos[clientId])
          groupedAceitos[clientId] = 0;

        groupedAceitos[clientId]++;
      });
      const ClientesSacaram = Object.keys(groupedAceitos).length;

      console.log("Sacaram OK! " + ClientesSacaram);

      // Saldo Gerado TODO: Por enquanto calcula o saldo total até o momento, não os do dia
      var SaldoGerado = 0;
      saldos.forEach(x => {
        SaldoGerado += x.data().valor;
      });

      console.log("Saldo Gerado OK! " + SaldoGerado);

      // Registro do Relatório

      const relatoriosDB = collection(db, "relatorios");
      q = query(relatoriosDB, where("data", ">=", start), where("data", "<=", end), limit(1));
      const r = await getDocs(q);
      if (r.empty)
      {
        await addDoc(collection(db, "relatorios"), {
          data: Timestamp.fromDate(new Date()),
          qtde_clientes: AllClients.size,
          qtde_clientes_nao_autorizados: ClientesNegados,
          qtde_clientes_com_saldo: ClientesComSaldo,
          qtde_clientes_sacaram: ClientesSacaram,
          saldo_gerado: SaldoGerado,
        });
      }
      else
      {
        const relatorioexistente = r.docs[0].ref;
        await updateDoc(relatorioexistente, {
          data: Timestamp.fromDate(new Date()),
          qtde_clientes: AllClients.size,
          qtde_clientes_nao_autorizados: ClientesNegados,
          qtde_clientes_com_saldo: ClientesComSaldo,
          qtde_clientes_sacaram: ClientesSacaram,
          saldo_gerado: SaldoGerado,
        });
      }

      setQtdeUsuarios(AllClients.size);
      setQtdeUsuariosComSaldo(ClientesComSaldo);
      setQtdeUsuariosNaoAutorizados(ClientesNegados);
      setQtdeUsuariosSacaram(ClientesSacaram);
      setSaldoGerado(SaldoGerado);

      setSelectedDate(date)
      setRelatorioTexto("Relatório Atual (" + SelectedDate + ")");
      setErrorText("");
    }
    catch (e)
    {
      console.log(e);
      setErrorText("Ocorreu um erro no carregamento do relatório de hoje.");
    }
  }

  const SameDate = (d1: Date, d2: Date) =>
  {
    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
    )
  }

  return (
    <View style={styles.Main}>
      <View style={styles.card}>
        <Text style={styles.text}>Relatórios de Uso</Text>
        <View style={styles.container2}>
          <Text style={styles.text}>{RelatorioTexto}</Text>
          <View>
            <Text style={styles.subtext}>Quantidade de Usuários Registrados: {QtdeUsuarios}</Text>
            <Text style={styles.subtext}>Quantidade de Usuários Com Saldo Disponível: {QtdeUsuariosComSaldo}</Text>
            <Text style={styles.subtext}>Quantidade de Usuários Que Sacaram: {QtdeUsuariosSacaram}</Text>
            <Text style={styles.subtext}>Quantidade de Usuários Não Autorizados: {QtdeUsuariosNaoAutorizados}</Text>
            <Text style={styles.subtext}>Saldo Gerado: {SaldoGerado}</Text>
          </View>
        </View>
        <View style={styles.container}>
          <Text style={styles.text}>Buscar Relatório:</Text>
          <Text style={styles.error}>{ErrorText}</Text>
          <TextInput
            style={styles.input}
            placeholder="01/01/0001"
            placeholderTextColor="#999"
            keyboardType="numeric"
            value={SelectedDate}
            onChangeText={handleDateChange}
            maxLength={10} //11 números + 2 pontos + 1 traço
          />
          <TouchableOpacity style={styles.button}
              onPress={() => LoadRelatorio(SelectedDate)}
            >
              <Text>Carregar Relatório</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
    
  );
}

const styles = StyleSheet.create({
  Main: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  container: {
    flex: 1,
    marginTop: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  container2: {
    padding: 20,
    marginTop: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    borderRadius: 8,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
  },
  subtext: {
    fontSize: 16,
    color: "#111",
    marginTop: 8,
  },
  error: {
    fontSize: 16,
    color: "#fc4903",
    marginTop: 8,
  },
  input: {
    height: 50,
    backgroundColor: "#FFF",
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    borderWidth: 1,
    color: "#333",
  },
  button: {
    borderRadius: 8,
    padding: 10,
    marginTop: 10,
    backgroundColor: "#FFC107"
  },
  card: {
    backgroundColor: "rgba(255, 255, 255, 1)",
    borderRadius: 12,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#333",
    padding: 20,
  },
});
