import { FlatList, View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";

// --- IMPORTS DO FIREBASE ---
import { Timestamp, doc, getDoc, addDoc, updateDoc, collection, query, where, getDocs, limit } from "firebase/firestore";
import { auth, db } from "../../firebaseConfig"; // Importa auth e db do seu config

export default function ADMManualAuth() {

  //Dados
  const [Solicitations, setSolicitations] = useState<any[]>([]);

  useEffect(() =>
  {
    RefreshSolicitation();
  }, [])

  const RefreshSolicitation = async () => {
    const SolDB = collection(db, "solicitacoes_saque");
    let res = await getDocs(SolDB);
    const sols = res.docs.map(doc => ({id: doc.id, ...doc.data()}));

    // TODO: Connecting Client instances to the solicitation 
    /*const clientIds = sols.map(sol => sol.id);
    const clientsMap: { [key: string]: any } = {};

    await Promise.all(
      clientIds.map(async id => {
        const clientRef = doc(db, "clientes", id);
        const clientSnap = await clientRef.get();
        if (clientSnap.exists()) {
          clientsMap[id] = clientSnap.data();
        }
      })
    ); 


    const merged = sols.map(sol => ({
      ...sol,
      client: clientsMap[sol.id_cliente] || null
    }));*/
    setSolicitations(sols);
    //console.log(Solicitations);
  }
  
  const ChangeStatus = async (item: any, Accept: boolean) =>
  {
    if (Accept)
      item.status = "ACEITO";
    else
      item.status = "NEGADO";
    RefreshSolicitation();

    console.log(item.id);
    let ref = doc(db, "solicitacoes_saque", item.id);
    const r = await getDoc(ref);
    if (r.exists())
    {
      console.log("Updating status to " + item.status);
      await updateDoc(ref, {
        status: item.status
      })//*/
      if (Accept) // Actually take away the FGTS cash
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
          
        }
        else
        {
          console.log("What?? Error either in the Id of client OR FGTS of said client!!!!!");
        }
      }
    }
    else
      console.log("Solicitação não encontrada!");
    
    RefreshSolicitation();
  }

  return (
    <View style={styles.Main}>
      <ScrollView style={styles.card}>
        <Text style={styles.text}>Autenticação Manual</Text>
        <View style={styles.container2}>
          <Text style={styles.text}>Solicitações:</Text>
          <FlatList
            data={Solicitations}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
            <View style={{ padding: 12, borderBottomWidth: 1, borderColor: "#ccc" }}>
              <View style={{ padding: 12, borderBottomWidth: 1, borderColor: "#ccc" }}>
                <Text>ID: {item.id}</Text>
                <Text>Data de Solicitação: {(new Date(item.data_solicitacao.seconds*1000).toLocaleDateString("pt-BR"))}</Text>
                <Text>Usuário:</Text>
                <View>
                  <Text>Id Usuário: {item.id_cliente}</Text>
                </View>
                <Text>Status: {item.status}</Text>
                <Text>Quantidade Solicitada: {item.valor}</Text>
                <TouchableOpacity style={styles.acceptbutton}
                  onPress={() => ChangeStatus(item, true)}
                  >
                  <Text>Aceitar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.dismissbutton}
                  onPress={() => ChangeStatus(item, false)}
                  >
                  <Text>Negar</Text>
                </TouchableOpacity>
              </View>   
            </View>
            )}
          />
        </View>
        <View style={styles.container}>
          <TouchableOpacity style={styles.button}
              onPress={() => RefreshSolicitation()}
            >
              <Text>Atualizar Solicitações</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
  container: {
    flex: 1,
    marginTop: 2,
    justifyContent: "center",
    alignItems: "center"
  },
  container2: {
    padding: 20,
    marginTop: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    borderRadius: 8
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
  acceptbutton: {
    flex: 1,
    borderRadius: 8,
    padding: 5,
    marginTop: 10,
    backgroundColor: "#2cde3e"
  },
  dismissbutton: {
    flex: 1,
    borderRadius: 8,
    padding: 5,
    marginTop: 10,
    backgroundColor: "#de382c"
  },
  card: {
    backgroundColor: "rgba(255, 255, 255, 1)",
    borderRadius: 12,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#333",
    padding: 20
  },
});
