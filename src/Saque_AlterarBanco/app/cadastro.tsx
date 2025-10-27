import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

// --- IMPORTS ATUALIZADOS DO FIREBASE ---
import { createUserWithEmailAndPassword } from "firebase/auth";
import {
  collection,
  doc,
  getDocs,
  limit,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { auth, db } from "../firebaseConfig"; // Importa 'auth' e 'db'
// --- FIM DOS IMPORTS ---

// ... (validatePassword, PasswordRequirement, etc. continuam iguais)
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

export default function CadastroScreen() {
  // ... (seus states: nomeCompleto, cpf, email, etc. continuam iguais)
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

  // 3. Adicionado estado de 'loading'
  const [loading, setLoading] = useState(false);

  // ... (seus handlers: handleCpfChange, handlePasswordChange continuam iguais)
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
  const handlePasswordChange = (text: string) => {
    setSenha(text);
    const validation = validatePassword(text);
    setPasswordStrength(validation.strength);
    setPasswordRequirements(validation.requirements);
  };

  // --- FUNÇÃO DE CADASTRO ---
  const handleCadastro = async () => {
    // 1. Validações locais
    if (!nomeCompleto || !cpf || !email || !senha || !confirmarSenha) {
      Alert.alert("Atenção", "Por favor, preencha todos os campos.");
      return;
    }
    if (senha !== confirmarSenha) {
      Alert.alert("Atenção", "As senhas digitadas não coincidem.");
      return;
    }
    if (passwordStrength !== "Forte") {
      Alert.alert(
        "Senha Inválida",
        "A senha não cumpre todos os requisitos de segurança."
      );
      return;
    }

    setLoading(true);

    try {
      // --- PASSO 1: VERIFICAR CPF DUPLICADO (NOVO) ---
      const cpfLimpo = cpf.replace(/[^\d]/g, "");
      const clientesRef = collection(db, "clientes");
      const q = query(clientesRef, where("cpf", "==", cpfLimpo), limit(1));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        // Se querySnapshot.empty for FALSO, significa que encontrou um CPF
        Alert.alert("Erro de Cadastro", "Este CPF já está em uso.");
        setLoading(false);
        return; // Para a execução
      }

      // --- PASSO 2: Criar usuário no FIREBASE AUTH ---
      // (Se o CPF é único, tenta criar o usuário)
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        senha
      );
      const user = userCredential.user;

      // --- PASSO 3: Salvar dados extras (Nome, CPF) no FIRESTORE ---
      await setDoc(doc(db, "clientes", user.uid), {
        nome: nomeCompleto,
        cpf: cpfLimpo,
        email: email,
        data_cadastro: new Date(),
      });

      // --- SUCESSO! ---
      Alert.alert(
        "Cadastro Concluído!",
        "Sua conta foi criada com sucesso. Você será redirecionado para o login.",
        // Esta ação já cumpre seu requisito de ir para a tela de login
        [{ text: "OK", onPress: () => router.push("/" as any) }]
      );
    } catch (error: any) {
      // --- PASSO 4: Tratar erros (Auth ou Firestore) ---
      if (error.code === "auth/email-already-in-use") {
        // A verificação de E-mail duplicado é pega aqui
        Alert.alert("Erro de Cadastro", "Este E-mail já está em uso.");
      } else {
        console.error(error);
        Alert.alert("Erro", "Ocorreu um erro inesperado no cadastro.");
      }
    } finally {
      setLoading(false); // Desativa o carregamento, independente de sucesso or erro
    }
  };

  // ... (getStrengthColor continua igual)
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
          {/* ... (Logo, Nome, CPF, Email, Senha, Medidor, Confirmar Senha... tudo igual) ... */}
          <View style={styles.logoContainer}>
            <Image
              source={require("../assets/images/logo.png")}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>NOME COMPLETO</Text>
            <TextInput
              style={styles.input}
              value={nomeCompleto}
              onChangeText={setNomeCompleto}
              editable={!loading} // Desativa edição enquanto carrega
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
              editable={!loading}
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
              editable={!loading}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>SENHA</Text>
            <View style={styles.passwordInputContainer}>
              <TextInput
                style={styles.passwordInputField}
                value={senha}
                onChangeText={handlePasswordChange}
                secureTextEntry={!isSenhaVisible}
                editable={!loading}
              />
              <TouchableOpacity
                onPress={() => setIsSenhaVisible(!isSenhaVisible)}
                disabled={loading}
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

          {senha.length > 0 && (
            <View style={styles.passwordFeedbackContainer}>
              {/* ... (Medidor de força) ... */}
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

          <View style={styles.inputGroup}>
            <Text style={styles.label}>CONFIRMAR SENHA</Text>
            <View style={styles.passwordInputContainer}>
              <TextInput
                style={styles.passwordInputField}
                value={confirmarSenha}
                onChangeText={setConfirmarSenha}
                secureTextEntry={!isConfirmarSenhaVisible}
                editable={!loading}
              />
              <TouchableOpacity
                onPress={() =>
                  setIsConfirmarSenhaVisible(!isConfirmarSenhaVisible)
                }
                disabled={loading}
              >
                <Ionicons
                  name={isConfirmarSenhaVisible ? "eye-off" : "eye"}
                  size={24}
                  color="#888"
                  style={styles.eyeIcon}
                />
              </TouchableOpacity>
            </View>
          </View>

          {confirmarSenha.length > 0 && (
            <Text
              style={[
                styles.passwordConfirmationText,
                { color: senha === confirmarSenha ? "#4CAF50" : "#F44336" },
              ]}
            >
              {senha === confirmarSenha
                ? "✓ As senhas coincidem"
                : "✗ As senhas não coincidem"}
            </Text>
          )}

          {/* --- BOTÃO DE CADASTRO ATUALIZADO --- */}
          <TouchableOpacity
            style={styles.button}
            onPress={handleCadastro}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#000" />
            ) : (
              <Text style={styles.buttonText}>CADASTRAR</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.push("/" as any)}
            disabled={loading}
          >
            <Text style={styles.linkText}>Já tenho uma conta</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

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
