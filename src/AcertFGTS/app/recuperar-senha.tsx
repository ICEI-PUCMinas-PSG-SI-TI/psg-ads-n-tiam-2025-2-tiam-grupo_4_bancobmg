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

// Reutilizando a mesma lógica de validação da tela de cadastro

const initialRequirements = {
  length: false,
  number: false,
  specialChar: false,
  uppercase: false,
  lowercase: false,
};

const validatePassword = (password: string) => {
  const requirements = { ...initialRequirements };
  let score = 0;

  if (password.length >= 8) {
    requirements.length = true;
    score++;
  }
  if ((password.match(/\d/g) || []).length >= 2) {
    requirements.number = true;
    score++;
  }
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    requirements.specialChar = true;
    score++;
  }
  if (/[A-Z]/.test(password)) {
    requirements.uppercase = true;
    score++;
  }
  if (/[a-z]/.test(password)) {
    requirements.lowercase = true;
    score++;
  }

  let strength = "";
  if (password.length > 0) {
    if (score < 3) strength = "Fraca";
    else if (score < 5) strength = "Média";
    else if (score === 5) strength = "Forte";
  }
  return { strength, requirements };
};

const PasswordRequirement = ({ met, text }: { met: boolean; text: string }) => (
  <Text
    style={[styles.requirementText, { color: met ? "#4CAF50" : "#F44336" }]}
  >
    {met ? "✓" : "✗"} {text}
  </Text>
);

export default function RecuperarSenhaScreen() {
  const [email, setEmail] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const router = useRouter();

  const [passwordStrength, setPasswordStrength] = useState("");
  const [passwordRequirements, setPasswordRequirements] =
    useState(initialRequirements);

  const [isNovaSenhaVisible, setIsNovaSenhaVisible] = useState(false);
  const [isConfirmarSenhaVisible, setIsConfirmarSenhaVisible] = useState(false);

  // handler para o campo de nova senha
  const handleNewPasswordChange = (text: string) => {
    setNovaSenha(text);
    const validation = validatePassword(text);
    setPasswordStrength(validation.strength);
    setPasswordRequirements(validation.requirements);
  };

  const handleRecuperar = () => {
    // 1. Validação se todos os campos estão preenchidos
    if (!email || !novaSenha || !confirmarSenha) {
      Alert.alert("Atenção", "Todos os campos são obrigatórios.");
      return;
    }
    // 2. Validação se as senhas coincidem
    if (novaSenha !== confirmarSenha) {
      Alert.alert("Atenção", "As senhas não coincidem.");
      return;
    }
    // 3. Validação se a senha é forte
    if (passwordStrength !== "Forte") {
      Alert.alert(
        "Senha Inválida",
        "A nova senha não cumpre todos os requisitos de segurança."
      );
      return;
    }

    console.log("Dados para recuperação:", { email, novaSenha });
    Alert.alert(
      "Sucesso!",
      "Sua senha foi redefinida. Você será redirecionado para o login.",
      [{ text: "OK", onPress: () => router.back() }]
    );
  };

  const getStrengthColor = (strength: string) => {
    if (strength === "Fraca") return "#F44336";
    if (strength === "Média") return "#FF9800";
    if (strength === "Forte") return "#4CAF50";
    return "#FFF";
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

          {/* Campo de Email (sem alteração) */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>DIGITE SEU E-MAIL</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          {/* --- CAMPO DE NOVA SENHA  --- */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>NOVA SENHA</Text>
            <View style={styles.passwordInputContainer}>
              <TextInput
                style={styles.passwordInputField}
                value={novaSenha}
                onChangeText={handleNewPasswordChange}
                secureTextEntry={!isNovaSenhaVisible}
              />
              <TouchableOpacity
                onPress={() => setIsNovaSenhaVisible(!isNovaSenhaVisible)}
              >
                <Ionicons
                  name={isNovaSenhaVisible ? "eye-off" : "eye"}
                  size={24}
                  color="#888"
                  style={styles.eyeIcon}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* --- MEDIDOR DE FORÇA E REQUISITOS --- */}
          {novaSenha.length > 0 && (
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
                { color: novaSenha === confirmarSenha ? "#4CAF50" : "#F44336" },
              ]}
            >
              {novaSenha === confirmarSenha
                ? "✓ As senhas coincidem"
                : "✗ As senhas não coincidem"}
            </Text>
          )}

          <TouchableOpacity style={styles.button} onPress={handleRecuperar}>
            <Text style={styles.buttonText}>RECUPERAR</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.linkText}>Voltar para o Login</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// Estilos, incluindo os novos para o feedback de senha
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
  title: { color: "#FFF", fontSize: 20, fontWeight: "bold", marginBottom: 20 },
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
    marginTop: -10,
    marginBottom: 10,
    paddingLeft: 5,
  },
  strengthLabel: {
    color: "#FFF",
    fontSize: 14,
    marginBottom: 8,
  },
  requirementsContainer: {},
  requirementText: {
    fontSize: 12,
    marginBottom: 2,
  },
});
