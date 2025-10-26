import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ScrollView,
  ActivityIndicator, // Adicionado para feedback de carregamento
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

// --- IMPORTS DO FIREBASE ---
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { collection, query, where, getDocs, limit } from "firebase/firestore";
import { auth, db } from "../firebaseConfig"; // Importa auth e db do seu config
// --- FIM DOS IMPORTS ---

//Função para formatar o CPF (copiada do seu outro arquivo)
const formatCPF = (value: string) => {
  const numericValue = value.replace(/[^\d]/g, "");
  const truncatedValue = numericValue.slice(0, 11);
  if (truncatedValue.length > 9) {
    return truncatedValue.replace(
      /(\d{3})(\d{3})(\d{3})(\d{2})/,
      "$1.$2.$3-$4"
    );
  } else if (truncatedValue.length > 6) {
    return truncatedValue.replace(/(\d{3})(\d{3})(\d{3})/, "$1.$2.$3");
  } else if (truncatedValue.length > 3) {
    return truncatedValue.replace(/(\d{3})(\d{3})/, "$1.$2");
  }
  return truncatedValue;
};

export default function RecuperarSenhaScreen() {
  const [cpf, setCpf] = useState(""); // Alterado de 'email' para 'cpf'
  const [loading, setLoading] = useState(false); // Estado de carregamento
  const router = useRouter();

  // Handler para o campo de CPF
  const handleCpfChange = (text: string) => {
    const formattedCpf = formatCPF(text);
    setCpf(formattedCpf);
  };

  // --- LÓGICA DE RECUPERAÇÃO COM CPF ---
  const handleRecuperar = async () => {
    if (!cpf) {
      Alert.alert("Atenção", "Por favor, digite seu CPF.");
      return;
    }

    setLoading(true);

    try {
      // --- PASSO 1: Achar o E-mail usando o CPF no Firestore ---
      const cpfLimpo = cpf.replace(/[^\d]/g, "");
      const clientesRef = collection(db, "clientes");

      // Cria a consulta: "SELECT * FROM clientes WHERE cpf == cpfLimpo LIMIT 1"
      const q = query(clientesRef, where("cpf", "==", cpfLimpo), limit(1));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        // Se não achou o CPF
        Alert.alert("Erro", "CPF não encontrado.");
        setLoading(false);
        return;
      }

      // Se achou, pegue o e-mail do documento
      const emailDoUsuario = querySnapshot.docs[0].data().email;

      // --- PASSO 2: Pedir ao FIREBASE AUTH para enviar o e-mail ---
      await sendPasswordResetEmail(auth, emailDoUsuario);

      Alert.alert(
        "Sucesso!",
        `Um e-mail de recuperação foi enviado para ${emailDoUsuario}. Verifique sua caixa de entrada (e spam).`,
        [{ text: "OK", onPress: () => router.back() }] // Volta para o login
      );
    } catch (error: any) {
      console.error(error);
      Alert.alert("Erro", "Não foi possível enviar o e-mail de recuperação.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.logoContainer}>
            <Image
              source={require("../assets/images/logo.png")}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.title}>RECUPERAR SENHA</Text>
          <Text style={styles.subtitle}>
            Digite seu CPF e enviaremos um link de recuperação para o e-mail
            cadastrado.
          </Text>

          {/* --- CAMPO DE CPF --- */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>CPF</Text>
            <TextInput
              style={styles.input}
              placeholder="000.000.000-00"
              placeholderTextColor="#999"
              value={cpf}
              onChangeText={handleCpfChange}
              keyboardType="numeric"
              maxLength={14}
            />
          </View>

          {/* --- REMOVIDOS OS CAMPOS DE SENHA E MEDIDOR --- */}

          <TouchableOpacity
            style={styles.button}
            onPress={handleRecuperar}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#000" />
            ) : (
              <Text style={styles.buttonText}>ENVIAR LINK</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.back()} disabled={loading}>
            <Text style={styles.linkText}>Voltar para o Login</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// Estilos
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  keyboardView: { flex: 1 },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 25,
    paddingVertical: 20,
  },
  logoContainer: { marginBottom: 20 },
  logo: { width: 100, height: 100 },
  title: { color: "#FFF", fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  // Adicionado subtítulo para explicar a ação
  subtitle: {
    color: "#CCC",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  inputGroup: { width: "100%", marginBottom: 15 },
  label: {
    color: "#FFF",
    fontSize: 12,
    marginBottom: 5,
    textTransform: "uppercase",
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#FFF",
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    color: "#333",
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#FFC107",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  buttonText: { color: "#000", fontSize: 18, fontWeight: "bold" },
  linkText: { color: "#FFC107", fontSize: 16, marginTop: 10 },
});
