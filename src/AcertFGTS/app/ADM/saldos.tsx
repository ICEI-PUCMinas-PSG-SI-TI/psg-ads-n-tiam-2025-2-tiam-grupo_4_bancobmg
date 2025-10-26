import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";

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

  const handleDateChange = (date: string) => {
    if (date.length == 2 || date.length == 5)
      date += "/";
    setSelectedDate(date);
  }

  const LoadRelatorio = (date: string) => {
    if (date.length < 10)
    {
      setErrorText("Data Inválida");
      return;
    }

    // TODO: Fazer busca de relatório a partir da data especificada
    let res;
    //let seperatedDate = date.split('/');
    let SearchDate = new Date(date)
    if (res)
    {
      // TODO: Set em todos os atributos a partir do novo relatório

      setSelectedDate(date)
      if (SearchDate == new Date())
        setRelatorioTexto("Relatório Atual (" + SelectedDate + ")");
      else
        setRelatorioTexto("Relatório de " + SelectedDate);

      setErrorText("");
    }
    else
    {
      setErrorText("Relatório não encontrado para esta data.");
    }
  };

  return (
    <View style={styles.Main}>
      <View style={styles.card}>
        <Text style={styles.text}>Gerenciar Saldo FGTS</Text>
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
