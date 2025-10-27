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
  ActivityIndicator, // Adicionado para feedback de carregamento
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

// --- IMPORTS DO FIREBASE ---
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { collection, query, where, getDocs, limit } from "firebase/firestore";
import { auth, db } from "../firebaseConfig"; // Importa auth e db do seu config
// --- FIM DOS IMPORTS ---

//Função para formatar o CPF
const formatCPF = (value: string) => {
  // Remove tudo que não for dígito
  const numericValue = value.replace(/[^\d]/g, "");
  const truncatedValue = numericValue.slice(0, 11);
  // Aplica a máscara
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

export default function LoginScreen() {
  const [cpf, setCpf] = useState<string>("");
  const [senha, setSenha] = useState<string>("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false); // Estado de carregamento
  const router = useRouter();

  // Criando um handler para atualizar o estado com o CPF formatado
  const handleCpfChange = (text: string) => {
    const formattedCpf = formatCPF(text);
    setCpf(formattedCpf);
  };

  const handleLogin = async () => {
    // Adicionar logica de validação
    // Exemplo simples:
    if (!cpf || !senha) {
      Alert.alert("Erro", "Por favor, preencha o CPF e a senha.");
      return;
    }

    console.log("Tentando logar com:");
    console.log("CPF:", cpf);
    console.log("Senha:", senha);

    try {
      // --- PASSO 1: Achar o E-mail usando o CPF ---
      const cpfLimpo = cpf.replace(/[^\d]/g, "");
      const AdmRef = collection(db, "administradores");
      const clientesRef = collection(db, "clientes");

      // Cria a consulta: "SELECT * FROM administradores WHERE cpf == cpfLimpo LIMIT 1"
      const q1 = query(AdmRef, where("cpf", "==", cpfLimpo), limit(1));
      const querySnapshot1 = await getDocs(q1);

      // Cria a consulta: "SELECT * FROM clientes WHERE cpf == cpfLimpo LIMIT 1"
      const q2 = query(clientesRef, where("cpf", "==", cpfLimpo), limit(1));
      const querySnapshot2 = await getDocs(q2);

      if (querySnapshot1.empty && querySnapshot2.empty) {
        // Se não achou o CPF
        Alert.alert("Erro", "CPF não encontrado.");
        setLoading(false);
        return;
      }

      var IsAdm = false;
      // Se achou, pegue o e-mail do documento
      var uData;
      var emailDoUsuario;
      if (querySnapshot2.empty)
      {
        // Dados do Administrador
        uData = querySnapshot1.docs[0].data();
        emailDoUsuario = uData.email;
        IsAdm = true;
      }
      else
      {
        // Dados do Cliente
        // Dados do Administrador
        uData = querySnapshot2.docs[0].data();
        emailDoUsuario = uData.email;
        IsAdm = false;
      }

      // --- PASSO 2: Fazer login no FIREBASE AUTH com o E-mail encontrado ---
      const userCredential = await signInWithEmailAndPassword(
        auth,
        emailDoUsuario,
        senha
      );

      // --- PASSO 3: Salvar o Token e dados do usuário ---
      const token = await userCredential.user.getIdToken();
      await AsyncStorage.setItem("@user_token", token);

      const userData = {
        uid: userCredential.user.uid,
        email: emailDoUsuario,
        nome: uData.nome,
      };
      await AsyncStorage.setItem("@user_data", JSON.stringify(userData));

      // --- SUCESSO! ----
      // Use 'replace' para o usuário não poder "voltar" para a tela de login
      if (IsAdm)
        router.replace("/ADM/home_ADM" as any);
      else
        router.replace("/home" as any);
    } catch (error: any) {
      if (
        error.code === "auth/wrong-password" ||
        error.code === "auth/invalid-credential"
      ) {
        Alert.alert("Erro", "Senha incorreta.");
      } else {
        console.error(error);
        Alert.alert("Erro", "Não foi possível fazer login.");
      }
    } finally {
      setLoading(false); // Desativa o carregamento
    }
    /* 
    // Se a validação for bem-sucedida, navegue para a tela principal.
    if (cpf == "999.999.999-99" && senha == "99999999999") 
      router.push("/ADM/home_ADM" as any);
    else
      router.push("/home" as any);
    setLoading(true); // Ativa o carregamento
    */
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <View style={styles.logoContainer}>
          <Image
            source={require("../assets/images/logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <Text style={styles.title}>LOGIN</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>CPF</Text>
          <TextInput
            style={styles.input}
            placeholder="000.000.000-00"
            placeholderTextColor="#999"
            keyboardType="numeric"
            value={cpf}
            onChangeText={handleCpfChange}
            maxLength={14} //11 números + 2 pontos + 1 traço
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Senha</Text>
          <View style={styles.passwordInputContainer}>
            <TextInput
              style={styles.passwordInputField}
              placeholder="Digite sua senha"
              placeholderTextColor="#999"
              value={senha}
              onChangeText={setSenha}
              secureTextEntry={!isPasswordVisible}
            />
            <TouchableOpacity
              onPress={() => setIsPasswordVisible(!isPasswordVisible)}
              disabled={loading} // Desativa o botão de olho durante o carregamento
            >
              <Ionicons
                name={isPasswordVisible ? "eye-off" : "eye"}
                size={24}
                color="#888"
                style={styles.eyeIcon}
              />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={handleLogin}
          disabled={loading} // Desativa o botão durante o carregamento
        >
          {loading ? (
            <ActivityIndicator size="small" color="#000" />
          ) : (
            <Text style={styles.buttonText}>ENTRAR</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/cadastro" as any)}
          disabled={loading}
        >
          <Text style={styles.linkText}>Cadastro</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/recuperar-senha" as any)}
          disabled={loading}
        >
          <Text style={styles.linkText}>Esqueci minha senha</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// Seus estilos (idênticos ao que você postou)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  keyboardView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 25,
  },
  logoContainer: {
    marginBottom: 30,
  },
  logo: {
    width: 120,
    height: 120,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFF",
    marginBottom: 30,
  },
  inputGroup: {
    width: "100%",
    marginBottom: 15,
  },
  label: {
    color: "#FFF",
    fontSize: 14,
    marginBottom: 5,
    textAlign: "left",
    width: "100%",
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
  passwordInputContainer: {
    width: "100%",
    height: 50,
    backgroundColor: "#FFF",
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
  },
  passwordInputField: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  eyeIcon: {
    marginLeft: 10,
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
  buttonText: {
    color: "#000",
    fontSize: 18,
    fontWeight: "bold",
  },
  linkText: {
    color: "#FFC107",
    fontSize: 16,
    marginTop: 10,
  },
});
