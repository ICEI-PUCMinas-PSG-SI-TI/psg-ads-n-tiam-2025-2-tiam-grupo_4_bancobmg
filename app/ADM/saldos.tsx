import { FlatList, View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from "react-native";
import React, { useState, useEffect } from "react";

// --- IMPORTS DO FIREBASE ---
import { Timestamp, doc, getDoc, addDoc, updateDoc, collection, query, where, getDocs, limit } from "firebase/firestore";
import { auth, db } from "../../firebaseConfig"; // Importa auth e db do seu config

export default function ADMFGTSManagement() {

  //Dados
  const [Clientes, setClientes] = useState<any[]>([]);
  const [FGTS, setFGTS] = useState<any[]>([]);
  const [QueryType, setQueryType] = useState("cpf");
  const [Query, setQuery] = useState("");

  var CJ;

  useEffect(() =>
  {
    RefreshClientes();
    GetConjoined();
  }, [])

  const RefreshClientes = async () => {
    const CliDB = collection(db, "clientes");
    let res = await getDocs(CliDB);
    const clientes = res.docs.map(doc => ({id: doc.id, ...doc.data()}));

    const fgtsDB = collection(db, "saldos_fgts");
    let res2 = await getDocs(fgtsDB);
    const fgts = res2.docs.map(doc => ({id: doc.id, ...doc.data()}));

    setClientes(clientes);
    setFGTS(fgts);

    CJ = GetConjoined();
  }
  
  const ChangeStatus = async (item: any, Accept: boolean) =>
  {
    RefreshClientes();

    console.log(item.id);
    let ref = doc(db, "solicitacoes_saque", item.id);
    const r = await getDoc(ref);
    if (r.exists())
    {
      console.log("Updating status to " + item.status);
      /*await updateDoc(ref, {
        status: item.status
      })//*/
      if (Accept) // Actually take away the FGTS
      {
        const fgtsDB = collection(db, "saldos_fgts");
        let q = query(fgtsDB, where("id_cliente", "==", r.data().id_cliente), limit(1))
        let fgts = await getDocs(q);
        let fgtsRef = doc(fgtsDB, fgts.docs[0].id);
        if ((await getDoc(fgtsRef)).exists())
        {
          let lastValue = fgts.docs[0].data().valor;
          console.log("New FGTS value: " + (lastValue - item.valor));
          /*await updateDoc(fgtsRef, {
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
  }

  const GetConjoined = () =>
  {
    const Conjoined: { [key: string]: any[] } = {};

    FGTS.forEach(f => {
      if (!Conjoined[f.id_cliente]) Conjoined[f.id_cliente] = [];
      Conjoined[f.id_cliente].push(f);
    });
    Clientes.forEach(c => {
      if (!Conjoined[c.id]) Conjoined[c.id] = [];
      Conjoined[c.id].push(c);
    })
    console.log(Conjoined);
    CJ = Conjoined;
    setCon(Conjoined);
    return Conjoined;
  }

  const handleFGTSChange = async (item: any, text:string) => 
  {
    try
    {
      const newval = Number(text);
      if (item.valor < 0) item.valor = 0;

      let ref = doc(db, "saldos_fgts", item.id);
      const r = await getDoc(ref);
      if (r.exists())
      {
        console.log("New FGTS value: " + newval);
        await updateDoc(ref, {
          valor: newval
        })
      }
    }
    catch (e)
    {
      console.log(e);
    }
    RefreshClientes(); //TODO: Optimize this crap so it doesn't take ages to type
  }

  const [Con, setCon] = useState({});

  return (
    <View style={styles.Main}>
      <ScrollView style={styles.card}>
        <Text style={styles.text}>Gerenciamento de FGTS</Text>
        <View style={styles.container2}>
          <Text style={styles.text}>Saldos FGTS:</Text>
          <FlatList
            data={FGTS}
            keyExtractor={item => item.key}
            renderItem={({ item }) => (
            <View style={{ padding: 12, borderBottomWidth: 1, borderColor: "#ccc" }}>
              <View style={{ padding: 12, borderBottomWidth: 1, borderColor: "#ccc" }}>
                <Text>ID Saldo: {item.id}</Text>
                <Text>Usuário: </Text>
                <View>
                  <Text>Id Usuário: {item.id_cliente}</Text>
                </View>
                <Text>Saldo FGTS: R$</Text>
                <TextInput
            style={styles.input}
            placeholder="1000"
            placeholderTextColor="#999"
            keyboardType="numeric"
            value={item.valor}
            onChangeText={text => handleFGTSChange(item, text)}
          />
              </View>   
            </View>
            )}
          />
        </View>
        <View style={styles.container}>
          <TouchableOpacity style={styles.button}
              onPress={() => RefreshClientes()}
            >
              <Text>Atualizar Saldos</Text>
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
