import React, { useEffect, useState } from "react";
import { Alert, FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

// --- IMPORTS DO FIREBASE ---
import { collection, doc, getDoc, getDocs, limit, query, updateDoc, where } from "firebase/firestore";
import { db } from "../../firebaseConfig"; // Importa auth e db do seu config

export default function ADMManualAuth() {

  const [Solicitations, setSolicitations] = useState<any[]>([]);

  useEffect(() => {
    RefreshSolicitation();
  }, []);

  const RefreshSolicitation = async () => {
    const SolDB = collection(db, "solicitacoes_saque");
    let res = await getDocs(SolDB);

    const sols = await Promise.all(
      res.docs.map(async (d) => {
        const data = d.data();

        // BUSCAR NOME DO USUÁRIO
        let userName = "Usuário não encontrado";
        if (data.id_cliente) {
          const userRef = doc(db, "clientes", data.id_cliente);
          const userSnap = await getDoc(userRef);
          if (userSnap.exists()) {
            userName = userSnap.data().nome || "Sem nome";
          }
        }

        return {
          id: d.id,
          ...data,
          userName,
        };
      })
    );

    setSolicitations(sols);
  };

  const ChangeStatus = async (item: any, Accept: boolean) => {
    item.status = Accept ? "ACEITO" : "NEGADO";
    RefreshSolicitation();

    let ref = doc(db, "solicitacoes_saque", item.id);
    const r = await getDoc(ref);

    if (r.exists()) {
      await updateDoc(ref, { status: item.status });

      if (Accept) {
        const fgtsDB = collection(db, "saldos_fgts");
        let q = query(fgtsDB, where("id_cliente", "==", r.data().id_cliente), limit(1));
        let fgts = await getDocs(q);

        if (!fgts.empty) {
          let fgtsRef = doc(fgtsDB, fgts.docs[0].id);
          let lastValue = fgts.docs[0].data().valor;

          await updateDoc(fgtsRef, {
            valor: (lastValue - item.valor)
          });

          Alert.alert("Saldo retirado com sucesso");
        }
      } else {
        Alert.alert("Saldo negado com sucesso");
      }
    }

    RefreshSolicitation();
  };

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
      <ScrollView style={styles.card}>
        <Text style={styles.titleText}>Autenticação Manual</Text>

        <View style={styles.container2}>
          <Text style={styles.titleText}>Solicitações:</Text>

          <FlatList
            data={Solicitations}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <View style={[styles.solicitationCard, { backgroundColor: getStatusColor(item.status) }]}>
                <Text style={styles.field}>ID: {item.id}</Text>

                <Text style={styles.field}>
                  Data de Solicitação:{" "}
                  {new Date(item.data_solicitacao.seconds * 1000).toLocaleDateString("pt-BR")}
                </Text>

                <Text style={styles.field}>Usuário: {item.userName}</Text>

                <Text style={styles.field}>Status: {item.status}</Text>

                <Text style={styles.field}>Quantidade Solicitada: R$ {item.valor}</Text>

                <TouchableOpacity style={styles.acceptbutton} onPress={() => ChangeStatus(item, true)}>
                  <Text style={styles.buttonLabel}>Aceitar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.dismissbutton} onPress={() => ChangeStatus(item, false)}>
                  <Text style={styles.buttonLabel}>Negar</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </View>

        <View style={styles.container}>
          <TouchableOpacity style={styles.updateButton} onPress={() => RefreshSolicitation()}>
            <Text style={styles.buttonLabel}>Atualizar Solicitações</Text>
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
    backgroundColor: "#000",
  },
  titleText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 10,
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  container2: {
    padding: 20,
    marginTop: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#eee",
    borderRadius: 8,
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
    marginTop: 20,
    width: "95%",
  },
});
