import { FlatList, View, Text, StyleSheet, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform } from "react-native";
import React, { useState, useEffect } from "react";

// --- IMPORTS DO FIREBASE ---
import { Timestamp, doc, getDoc, addDoc, updateDoc, collection, query, where, getDocs, limit } from "firebase/firestore";
import { auth, db } from "../../firebaseConfig"; // Importa auth e db do seu config

type FGTSItem = {
  id: string;
  id_cliente: string;
  valor: number;
  // anything else you have
};
type FGTSMap = Record<string, FGTSItem>;

export default function ADMFGTSManagement() {

  //Dados
  const [Clientes, setClientes] = useState<Record<string, any>>({});
  const [FGTS, setFGTS] = useState<any[]>([]);
  const [fgtsValues, setFgtsValues] = useState<Record<string, string>>({});

  useEffect(() => {
    RefreshClientes();
  }, [])

  const RefreshClientes = async () => {
    const CliDB = collection(db, "clientes");
    let res = await getDocs(CliDB);
    const clientesArr = res.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    const clientes = Object.fromEntries(
      clientesArr.map(c => [c.id, c])
    );

    const fgtsDB = collection(db, "saldos_fgts");
    let res2 = await getDocs(fgtsDB);
    const fgts = res2.docs.map(doc => ({ id: doc.id, ...doc.data() })) as FGTSItem[];

    const temp: Record<string, string> = {};
    fgts.forEach(item => {
      temp[item.id] = String(item.valor ?? "");
    });

    setFgtsValues(temp);
    setClientes(clientes);
    setFGTS(fgts);

    /*fgts.forEach(e =>{
      console.log(`${e.id} => ${clientes[e.id_cliente]}`)
    })*/

    console.log("ahoy!");
  }

  const handleFGTSChange = async (item: any, text: string) => {
    try {
      const newval = Number(text);
      if (item.valor < 0) item.valor = 0;

      let ref = doc(db, "saldos_fgts", item.id);
      const r = await getDoc(ref);
      if (r.exists()) {
        console.log("New FGTS value: " + newval);
        await updateDoc(ref, {
          valor: newval
        })
      }
    }
    catch (e) {
      console.log(e);
    }
    RefreshClientes();
  }

  const logtest = (text: string) => {
    console.log(text);
    return "";
  }

  return (
    <KeyboardAvoidingView
      style={styles.Main}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={200}
    >
      <View style={styles.Main}>
        <View style={styles.card}>
          <Text style={styles.text}>Gerenciamento de FGTS</Text>
          <View style={styles.container2}>
            <FlatList
              data={FGTS}
              keyExtractor={item => item.id}

              ListHeaderComponent={
                <View>
                  <Text style={styles.text}>Saldos FGTS:</Text>
                </View>
              }

              renderItem={({ item }) => (
                <View style={{ padding: 12, borderBottomWidth: 1, borderColor: "#ccc" }}>
                  {/*logtest(item.id)*/}
                  <View style={{ padding: 12, borderBottomWidth: 1, borderColor: "#ccc" }}>
                    <Text>ID Saldo: {item.id}</Text>
                    <Text>Usuário: {Clientes[item.id_cliente]?.nome}</Text>
                    <View>
                      <Text>Id Usuário: {item.id_cliente}</Text>
                    </View>
                    <Text>Saldo FGTS: R$</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="1000"
                      placeholderTextColor="#999"
                      keyboardType="numeric"
                      value={String(fgtsValues[item.id])}
                      onChangeText={(text) =>
                        setFgtsValues(v => ({ ...v, [item.id]: text }))
                      }
                      onEndEditing={() => handleFGTSChange(item, fgtsValues[item.id])}
                    />
                  </View>
                </View>
              )}

              ListFooterComponent={
                <View style={styles.container}>
                  <TouchableOpacity style={styles.button}
                    onPress={() => RefreshClientes()} >
                    <Text>Atualizar Saldos</Text>
                  </TouchableOpacity>
                </View>
              }
            />
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
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
    flex: 1,
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
    margin: 24,
    borderWidth: 1,
    borderColor: "#333",
    padding: 20
  },
});
