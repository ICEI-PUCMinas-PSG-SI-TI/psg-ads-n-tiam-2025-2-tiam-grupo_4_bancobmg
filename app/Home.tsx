import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { collection, getDocs, limit, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { db } from "../firebaseConfig";
import colors from "./styles/colors";

export default function HomeScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saldo, setSaldo] = useState<number>(0);

  const carregarSaldo = async () => {
    try {
      const userData = await AsyncStorage.getItem("@user_data");
      if (!userData) return;

      const user = JSON.parse(userData);
      const userId = user.uid;

      const saldoRef = collection(db, "saldos_fgts");
      const q = query(saldoRef, where("id_cliente", "==", userId), limit(1));
      const resultado = await getDocs(q);

      if (!resultado.empty) {
        const dados = resultado.docs[0].data();
        setSaldo(dados.valor || 0);
      }
    } catch (e) {
      console.log("Erro ao carregar saldo:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarSaldo();
  }, []);

  const formatar = (valor: number) =>
    valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  return (
    <LinearGradient
      colors={colors.fundo as [string, string]}
      style={styles.container}
    >
      {/* Header Logo */}
      <View style={styles.header}>
        <Image
          source={require("../assets/images/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* Título */}
      <Text style={styles.title}>INÍCIO</Text>

      {/* Card principal */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={styles.profileImage} />
          <Text style={styles.profileName}>Olá, Usuário!</Text>
        </View>

        <View style={styles.cardBody}>
          <Text style={styles.cardTitle}>Saldo disponível para saque</Text>

          {loading ? (
            <ActivityIndicator
              size="large"
              color={colors.yellow}
              style={{ marginTop: 15 }}
            />
          ) : (
            <Text style={styles.saldoValor}>{formatar(saldo)}</Text>
          )}

          {/* Botão SACAR */}
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => router.push("/Saque")}
          >
            <Text style={styles.primaryButtonText}>Sacar agora</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Container dos botões secundários */}
      <View style={styles.buttonsContainer}>
        {/* Botão ALTERAR CONTA */}
        <TouchableOpacity
          style={styles.whiteButton}
          onPress={() => router.push("/AlterarConta")}
        >
          <Text style={styles.whiteButtonText}>Alterar conta de recebimento</Text>
        </TouchableOpacity>

        {/* Botão INDICAR ACERT */}
        <TouchableOpacity
          style={styles.whiteButton}
          onPress={() => alert("Função de indicação em desenvolvimento")}
        >
          <Text style={styles.whiteButtonText}>Indicar a Acert</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    alignItems: "center",
    paddingTop: 35,
    paddingBottom: 5,
  },

  logo: {
    width: 170,
    height: 80,
  },

  title: {
    color: colors.yellow,
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
    marginTop: 5,
  },

  card: {
    width: "90%",
    alignSelf: "center",
    backgroundColor: "rgba(26, 26, 26, 0.85)",
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#333",
  },

  cardHeader: {
    paddingVertical: 22,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },

  profileImage: {
    width: 75,
    height: 75,
    borderRadius: 38,
    backgroundColor: "#444",
    marginBottom: 10,
  },

  profileName: {
    color: colors.yellow,
    fontSize: 18,
    fontWeight: "600",
  },

  cardBody: {
    alignItems: "center",
    padding: 18,
  },

  cardTitle: {
    color: colors.yellow,
    fontSize: 18,
    marginBottom: 10,
  },

  saldoValor: {
    color: "#FFF",
    fontSize: 34,
    fontWeight: "bold",
    marginBottom: 22,
  },

  primaryButton: {
    backgroundColor: colors.yellow,
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
    width: "80%",
    marginTop: 10,
  },

  primaryButtonText: {
    color: "#000",
    fontSize: 18,
    fontWeight: "bold",
  },

  buttonsContainer: {
    marginTop: 15,      
    alignItems: "center",
    gap: 15,
  },

  whiteButton: {
    width: "90%",
    backgroundColor: colors.yellow,
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: "center",
  },

  whiteButtonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "600",
  },
});
