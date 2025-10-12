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
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

// Objeto para armazenar o estado de cada requisito da senha
const initialRequirements = {
  length: false,
  number: false,
  specialChar: false,
  uppercase: false,
  lowercase: false,
};

// Função para validar a senha e retornar a força e os requisitos atendidos
const validatePassword = (password: string) => {
  const requirements = { ...initialRequirements };
  let score = 0;

  // 1. Comprimento mínimo de 8 caracteres
  if (password.length >= 8) {
    requirements.length = true;
    score++;
  }

  // 2. Mínimo de 2 números
  if ((password.match(/\d/g) || []).length >= 2) {
    requirements.number = true;
    score++;
  }

  // 3. Mínimo de 1 caractere especial
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    requirements.specialChar = true;
    score++;
  }

  // 4. Mínimo de 1 letra maiúscula
  if (/[A-Z]/.test(password)) {
    requirements.uppercase = true;
    score++;
  }

  // 5. Mínimo de 1 letra minúscula
  if (/[a-z]/.test(password)) {
    requirements.lowercase = true;
    score++;
  }

  // Determina a força com base na pontuação
  let strength = "";
  if (password.length > 0) {
    if (score < 3) strength = "Fraca";
    else if (score < 5) strength = "Média";
    else if (score === 5) strength = "Forte";
  }

  return { strength, requirements };
};

// Componente para exibir os requisitos da senha
const PasswordRequirement = ({ met, text }: { met: boolean; text: string }) => (
  <Text
    style={[styles.requirementText, { color: met ? "#4CAF50" : "#F44336" }]}
  >
    {met ? "✓" : "✗"} {text}
  </Text>
);

export default function CadastroScreen() {
  const [nomeCompleto, setNomeCompleto] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const router = useRouter();

  const [passwordStrength, setPasswordStrength] = useState("");
  const [passwordRequirements, setPasswordRequirements] =
    useState(initialRequirements);

  const [isSenhaVisible, setIsSenhaVisible] = useState(false);
  const [isConfirmarSenhaVisible, setIsConfirmarSenhaVisible] = useState(false);

  const handleCpfChange = (text: string) => {
    const formatCPF = (value: string) => {
      const numericValue = value.replace(/[^\d]/g, "");
      const truncatedValue = numericValue.slice(0, 11);
      if (truncatedValue.length > 9) {
        return truncatedValue.replace(
          /(\d{3})(\d{3})(\d{3})(\d{2})/,
          "$1.$2.$3-$4"
        );
      }
      if (truncatedValue.length > 6) {
        return truncatedValue.replace(/(\d{3})(\d{3})(\d{3})/, "$1.$2.$3");
      }
      if (truncatedValue.length > 3) {
        return truncatedValue.replace(/(\d{3})(\d{3})/, "$1.$2");
      }
      return truncatedValue;
    };
    setCpf(formatCPF(text));
  };

  // handler para o campo de senha
  const handlePasswordChange = (text: string) => {
    setSenha(text);
    const validation = validatePassword(text);
    setPasswordStrength(validation.strength);
    setPasswordRequirements(validation.requirements);
  };

  const handleCadastro = () => {
    // 1. Validação se todos os campos estão preenchidos
    if (!nomeCompleto || !cpf || !email || !senha || !confirmarSenha) {
      Alert.alert("Atenção", "Por favor, preencha todos os campos.");
      return;
    }
    // 2. Validação se as senhas coincidem
    if (senha !== confirmarSenha) {
      Alert.alert("Atenção", "As senhas digitadas não coincidem.");
      return;
    }
    // 3. Validação se a senha é forte (todos os requisitos cumpridos)
    if (passwordStrength !== "Forte") {
      Alert.alert(
        "Senha Inválida",
        "A senha não cumpre todos os requisitos de segurança."
      );
      return;
    }

    console.log("Novos dados de cadastro:", {
      nomeCompleto,
      cpf,
      email,
      senha,
    });
    Alert.alert("Cadastro Concluído!", "Sua conta foi criada com sucesso.", [
      { text: "OK", onPress: () => router.back() },
    ]);
  };

  // Função auxiliar para definir a cor do medidor de força
  const getStrengthColor = (strength: string) => {
    if (strength === "Fraca") return "#F44336"; // Vermelho
    if (strength === "Média") return "#FF9800"; // Laranja
    if (strength === "Forte") return "#4CAF50"; // Verde
    return "#FFF"; // Cor padrão
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

          {/* Campos Nome, CPF e Email (sem alterações) */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>NOME COMPLETO</Text>
            <TextInput
              style={styles.input}
              value={nomeCompleto}
              onChangeText={setNomeCompleto}
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>CPF</Text>
            <TextInput
              style={styles.input}
              placeholder="000.000.000-00"
              placeholderTextColor="#999"
              keyboardType="numeric"
              value={cpf}
              onChangeText={handleCpfChange}
              maxLength={14}
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>E-MAIL</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          {/* --- CAMPO DE SENHA  --- */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>SENHA</Text>
            <View style={styles.passwordInputContainer}>
              <TextInput
                style={styles.passwordInputField}
                value={senha}
                onChangeText={handlePasswordChange}
                secureTextEntry={!isSenhaVisible}
              />
              <TouchableOpacity
                onPress={() => setIsSenhaVisible(!isSenhaVisible)}
              >
                <Ionicons
                  name={isSenhaVisible ? "eye-off" : "eye"}
                  size={24}
                  color="#888"
                  style={styles.eyeIcon}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* --- MEDIDOR DE FORÇA E REQUISITOS --- */}
          {senha.length > 0 && (
            <View style={styles.passwordFeedbackContainer}>
              <Text style={styles.strengthLabel}>
                Força da senha:{" "}
                <Text
                  style={{
                    color: getStrengthColor(passwordStrength),
                    fontWeight: "bold",
                  }}
                >
                  {passwordStrength}
                </Text>
              </Text>
              <View style={styles.requirementsContainer}>
                <PasswordRequirement
                  met={passwordRequirements.length}
                  text="Mínimo de 8 caracteres"
                />
                <PasswordRequirement
                  met={passwordRequirements.uppercase}
                  text="Uma letra maiúscula"
                />
                <PasswordRequirement
                  met={passwordRequirements.lowercase}
                  text="Uma letra minúscula"
                />
                <PasswordRequirement
                  met={passwordRequirements.number}
                  text="Mínimo de 2 números"
                />
                <PasswordRequirement
                  met={passwordRequirements.specialChar}
                  text="Um caractere especial (!@#...)"
                />
              </View>
            </View>
          )}

          {/* --- CAMPO DE CONFIRMAR SENHA --- */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>CONFIRMAR SENHA</Text>
            <TextInput
              style={styles.input}
              value={confirmarSenha}
              onChangeText={setConfirmarSenha}
              secureTextEntry
            />
          </View>

          {/* Mostra o feedback de confirmação apenas se o campo não estiver vazio */}
          {confirmarSenha.length > 0 && (
            <Text
              style={[
                styles.passwordConfirmationText,
                { color: senha === confirmarSenha ? "#4CAF50" : "#F44336" }, // Verde se for igual, Vermelho se for diferente
              ]}
            >
              {senha === confirmarSenha
                ? "✓ As senhas coincidem"
                : "✗ As senhas não coincidem"}
            </Text>
          )}

          <TouchableOpacity style={styles.button} onPress={handleCadastro}>
            <Text style={styles.buttonText}>CADASTRAR</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.linkText}>Já tenho uma conta</Text>
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
  buttonText: { color: "#000", fontSize: 18, fontWeight: "bold" },
  linkText: { color: "#FFC107", fontSize: 16, marginTop: 10 },
  // Estilos para o feedback da senha
  passwordFeedbackContainer: {
    width: "100%",
    padding: 10,
    backgroundColor: "#222",
    borderRadius: 8,
    marginBottom: 15,
  },
  passwordConfirmationText: {
    width: "100%",
    fontSize: 12,
    fontWeight: "bold",
    marginTop: -10, // Puxa o texto para mais perto do input acima
    marginBottom: 10,
    paddingLeft: 5,
  },
  strengthLabel: {
    color: "#FFF",
    fontSize: 14,
    marginBottom: 8,
  },
  requirementsContainer: {
    // Estilos para o container dos requisitos, se necessário
  },
  requirementText: {
    fontSize: 12,
    marginBottom: 2,
  },
});
