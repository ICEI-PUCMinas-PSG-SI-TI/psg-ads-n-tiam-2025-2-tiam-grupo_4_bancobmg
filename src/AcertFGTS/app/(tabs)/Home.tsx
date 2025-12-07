import { FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter, useFocusEffect } from "expo-router"; // Importar useFocusEffect
import { collection, getDocs, limit, query, where } from "firebase/firestore";
import React, { useState, useCallback } from "react"; // Importar useCallback
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView
} from "react-native";
import { auth, db } from "../../firebaseConfig"; // Importar auth
import colors from "../styles/colors";

export default function HomeScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saldo, setSaldo] = useState<number>(0);

  // Novos estados para perfil
  const [fotoPerfil, setFotoPerfil] = useState<string | null>(null);
  const [nomeUsuario, setNomeUsuario] = useState("Usuário");

  // Função para buscar o saldo no Firestore
  const carregarSaldo = async (userId: string) => {
    try {
      const saldoRef = collection(db, "saldos_fgts");
      const q = query(saldoRef, where("id_cliente", "==", userId), limit(1));
      const resultado = await getDocs(q);

      if (!resultado.empty) {
        const dados = resultado.docs[0].data();
        setSaldo(dados.valor || 0);
      }
    } catch (e) {
      console.log("Erro ao carregar saldo:", e);
    }
  };

  useFocusEffect(
    useCallback(() => {
      const carregarDados = async () => {
        setLoading(true);
        try {
          // 1. Pega dados frescos do Auth (Foto e Nome)
          const user = auth.currentUser;

          if (user) {
            setFotoPerfil(user.photoURL);
            setNomeUsuario(user.displayName || "Usuário");

            // 2. Carrega o saldo usando o ID do Auth
            await carregarSaldo(user.uid);
          } else {
            // Fallback se não tiver auth (ex: usar AsyncStorage antigo)
            const userData = await AsyncStorage.getItem("@user_data");
            if (userData) {
              const parsedUser = JSON.parse(userData);
              await carregarSaldo(parsedUser.uid);
            }
          }
        } catch (e) {
          console.log("Erro geral:", e);
        } finally {
          setLoading(false);
        }
      };

      carregarDados();
    }, [])
  );

  const formatar = (valor: number) =>
    valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  return (
    <LinearGradient
      colors={colors.fundo as [string, string]}
      style={styles.containerTop}
    >
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 40,
          alignItems: "center",
        }}
        showsVerticalScrollIndicator={false}
      >
      {/* Header Logo */}
      <View style={styles.header}>
        <Image
          source={require("../../assets/images/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* Título */}
      <Text style={styles.title}>INÍCIO</Text>

      {/* Card principal */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          {/* Lógica da Imagem de Perfil */}
          <View style={styles.imageContainer}>
            {fotoPerfil ? (
              <Image source={{ uri: fotoPerfil }} style={styles.profileImage} />
            ) : (
              <View style={[styles.profileImage, styles.placeholderImage]}>
                <FontAwesome name="user" size={35} color="#888" />
              </View>
            )}
          </View>

          <Text style={styles.profileName}>Olá, {nomeUsuario}!</Text>
        </View>

        <View style={styles.cardBody}>
          <Text style={styles.cardTitle}>
            Saldo disponível para saque
          </Text>

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
        <TouchableOpacity
          style={styles.whiteButton}
          onPress={() => router.push("/(tabs)/AlterarConta")}
        >
          <Text style={styles.whiteButtonText}>
            Alterar conta de recebimento
          </Text>
        </TouchableOpacity>

        {/* Botão INDICAR ACERT */}
        <TouchableOpacity
          style={styles.whiteButton}
          onPress={() => router.push("/Indicacao")}
        >
          <Text style={styles.whiteButtonText}>Indicar a Acert</Text>
        </TouchableOpacity>
      </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerTop: {
    flex: 1,
    paddingBottom: 10
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
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#333",
  },

  cardHeader: {
    paddingVertical: 22,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },

  imageContainer: {
    marginBottom: 10,
    elevation: 5,
  },

  profileImage: {
    width: 75,
    height: 75,
    borderRadius: 38, // Metade da largura para ser redondo
    backgroundColor: "#444",
    borderWidth: 2,
    borderColor: colors.yellow, // Borda amarela para destacar
  },

  placeholderImage: {
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#555",
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
    width: "100%",
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
