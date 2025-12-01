import { FlatList, View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import React, { useState, useEffect } from "react";

// --- IMPORTS DO FIREBASE ---
import { Timestamp, doc, getDoc, addDoc, updateDoc, collection, query, where, getDocs, limit } from "firebase/firestore";
import { auth, db } from "../../firebaseConfig"; // Importa auth e db do seu config

export default function ADMManualAuth() {

  //Dados
  const [Clientes, setClientes] = useState<Record<string, any>>({});
  const [Solicitations, setSolicitations] = useState<any[]>([]);

  useEffect(() =>
  {
    RefreshSolicitation();
  }, [])

  const RefreshSolicitation = async () => {
    const SolDB = collection(db, "solicitacoes_saque");
    let res = await getDocs(SolDB);
    const sols = res.docs.map(doc => ({id: doc.id, ...doc.data()}));

    const CliDB = collection(db, "clientes");
    let res2 = await getDocs(CliDB);
    const clientesArr = res2.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    const clientes = Object.fromEntries(
      clientesArr.map(c => [c.id, c])
    );

    setClientes(clientes);
    setSolicitations(sols);
  }
  
  const ChangeStatus = async (item: any, Accept: boolean) =>
  {
    if (Accept)
      item.status = "ACEITO";
    else
      item.status = "NEGADO";
    RefreshSolicitation();

    let ref = doc(db, "solicitacoes_saque", item.id);
    const r = await getDoc(ref);
    if (r.exists())
    {
      console.log("Updating status to " + item.status);
      await updateDoc(ref, {
        status: item.status
      })//*/
      if (Accept) // Actually take away the FGTS
      {
        const fgtsDB = collection(db, "saldos_fgts");
        let q = query(fgtsDB, where("id_cliente", "==", r.data().id_cliente), limit(1))
        let fgts = await getDocs(q);
        if (!fgts.empty)
        {
          let fgtsRef = doc(fgtsDB, fgts.docs[0].id);
          let lastValue = fgts.docs[0].data().valor;
          console.log("New FGTS value: " + (lastValue - item.valor));
          await updateDoc(fgtsRef, {
            valor: (lastValue - item.valor)
          })//*/
          Alert.alert("Sucesso", "Saldo retirado com sucesso");
        }
        else
        {
          console.log("What?? Error either in the Id of client OR FGTS of said client!!!!!");
        }
      }
      else
      {
        Alert.alert("Sucesso", "Saldo negado com sucesso");
      }
    }
    else
      console.log("Solicitação não encontrada!");
    
    RefreshSolicitation();
  }

  // ALTERA COR DO CARD CONFORME STATUS
  const getStatusColor = (status: string) => {
    switch (status) {
      case "ACEITO":
        return "#c8ffcc"; // verde claro
      case "NEGADO":
        return "#ffb3b3"; // vermelho claro
      default:
        return "#fff"; // padrão
    }
  };

  return (
    <View style={styles.Main}>
      <View style={styles.card}>
        <Text style={styles.titleText}>Autenticação Manual</Text>
        <View style={styles.container2}>
          <FlatList
            data={Solicitations}
            keyExtractor={item => item.id}
            style={styles.smallmargin}

            ListHeaderComponent={
              <View>
                <Text style={styles.titleText}>Solicitações:</Text>
              </View>
            }

            renderItem={({ item }) => (
            <View style={[styles.solicitationCard, { backgroundColor: getStatusColor(item.status) }]}>
              <Text style={styles.field}>ID: {item.id}</Text>

              <Text style={styles.field}>
                  Data de Solicitação:{" "}
                  {new Date(item.data_solicitacao.seconds * 1000).toLocaleDateString("pt-BR")}
                </Text>

                <Text style={styles.field}>Usuário: {Clientes[item.id_cliente]?.nome}</Text>
                <View>
                  <Text>Id Usuário: {item.id_cliente}</Text>
                </View>
                <Text style={styles.field}>Status: {item.status}</Text>

                <Text style={styles.field}>Quantidade Solicitada: R$ {item.valor}</Text>
                <TouchableOpacity style={[styles.acceptbutton, item.status != "PENDENTE" && { opacity: 0.5 }]}
                  onPress={() => ChangeStatus(item, true)}
                  disabled={item.status != "PENDENTE"}
                  >
                  <Text style={styles.buttonLabel}>Aceitar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.dismissbutton, item.status != "PENDENTE" && { opacity: 0.5 }]}
                  onPress={() => ChangeStatus(item, false)}
                  disabled={item.status != "PENDENTE"}
                  >
                  <Text style={styles.buttonLabel}>Negar</Text>
                </TouchableOpacity>
            </View>
            )}

            ListFooterComponent={
              <View style={styles.container}>
                <TouchableOpacity style={styles.updateButton} onPress={() => RefreshSolicitation()}>
                  <Text style={styles.buttonLabel}>Atualizar Solicitações</Text>
                </TouchableOpacity>
              </View>
            }
          />
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
    backgroundColor: "#000"
  },
  titleText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 10,
  },
  container: {
    justifyContent: "center",
    alignItems: "center"
  },
  container2: {
    padding: 20,
    marginTop: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#eee",
    borderRadius: 8
  },
  solicitationCard: {
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#444",
    marginBottom: 12,
    width: "100%",
  },
  field: {
    fontSize: 16,
    marginBottom: 4,
    color: "#111",
  },
  updateButton: {
    backgroundColor: "#FFC107",
    padding: 10,
    borderRadius: 10,
  },
  acceptbutton: {
    backgroundColor: "#2cde3e",
    padding: 8,
    borderRadius: 8,
    marginTop: 10,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000"
  },
  subtext: {
    fontSize: 16,
    color: "#111",
    marginTop: 8
  },
  error: {
    fontSize: 16,
    color: "#fc4903",
    marginTop: 8
  },
  input: {
    height: 50,
    backgroundColor: "#FFF",
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    borderWidth: 1,
    color: "#333"
  },
  button: {
    borderRadius: 8,
    padding: 10,
    marginTop: 10,
    backgroundColor: "#FFC107"
  },
  smallmargin: {
    marginBottom: 10
  },
  dismissbutton: {
    backgroundColor: "#de382c",
    padding: 8,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonLabel: {
    fontSize: 16,
    color: "#000",
    textAlign: "center",
    fontWeight: "bold",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    margin: 30,
    marginBottom: 20,
    width: "95%",
  },
});
