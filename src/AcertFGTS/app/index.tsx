// src/app/index.tsx

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
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

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
  const router = useRouter();

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // Criando um handler para atualizar o estado com o CPF formatado
  const handleCpfChange = (text: string) => {
    const formattedCpf = formatCPF(text);
    setCpf(formattedCpf);
  };

  const handleLogin = () => {
    // TODO: Adicionar logica de validação
    // TEMP: CPF 99999999999 SENHA 99999999999 => ADM
    // Exemplo simples:
    if (!cpf || !senha) {
      Alert.alert("Erro", "Por favor, preencha o CPF e a senha.");
      return;
    }

    console.log("Tentando logar com:");
    console.log("CPF:", cpf);
    console.log("Senha:", senha);

    // Se a validação for bem-sucedida, navegue para a tela principal.
    if (cpf == "999.999.999-99" && senha == "99999999999") 
      router.push("/ADM/home_ADM" as any);
    else
      router.push("/home" as any);
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
              // A visibilidade é controlada pelo estado
              secureTextEntry={!isPasswordVisible}
            />
            <TouchableOpacity
              onPress={() => setIsPasswordVisible(!isPasswordVisible)}
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

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>ENTRAR</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/cadastro" as any)}>
          <Text style={styles.linkText}>Cadastro</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/recuperar-senha" as any)}
        >
          <Text style={styles.linkText}>Esqueci minha senha</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

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
    flex: 1, // Faz o campo de texto ocupar todo o espaço disponível
    fontSize: 16,
    color: "#333",
  },
  eyeIcon: {
    marginLeft: 10, // Espaço entre o texto e o ícone
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
