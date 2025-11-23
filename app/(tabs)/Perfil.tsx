import { FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  signOut,
  updateEmail, // Usamos este para troca direta
  updatePassword,
  updateProfile,
} from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import React, { useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { auth, db } from "../../firebaseConfig";
import colors from "../styles/colors";

// --- Validação de Senha ---
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
    style={[styles.requirementText, { color: met ? "#4CAF50" : "#FF4444" }]}
  >
    {met ? "✓" : "✗"} {text}
  </Text>
);

const getStrengthColor = (strength: string) => {
  if (strength === "Fraca") return "#FF4444";
  if (strength === "Média") return "#FF9800";
  if (strength === "Forte") return "#4CAF50";
  return "#FFF";
};

export default function PerfilScreen() {
  const router = useRouter();
  const user = auth.currentUser;
  const scrollViewRef = useRef<ScrollView>(null);

  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<string | null>(user?.photoURL || null);
  const [editando, setEditando] = useState(false);

  // Estados
  const [novoEmail, setNovoEmail] = useState("");
  const [confirmarEmail, setConfirmarEmail] = useState("");
  const [senhaAtual, setSenhaAtual] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarNovaSenha, setConfirmarNovaSenha] = useState("");

  // Validadores Visuais
  const [passwordStrength, setPasswordStrength] = useState("");
  const [passwordRequirements, setPasswordRequirements] =
    useState(initialRequirements);
  const [showSenhaAtual, setShowSenhaAtual] = useState(false);
  const [showNovaSenha, setShowNovaSenha] = useState(false);
  const [showConfSenha, setShowConfSenha] = useState(false);

  const handlePasswordChange = (text: string) => {
    setNovaSenha(text);
    const validation = validatePassword(text);
    setPasswordStrength(validation.strength);
    setPasswordRequirements(validation.requirements);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSalvarAlteracoes = async () => {
    if (!user) return;

    // --- Validações ---
    if (novoEmail && novoEmail !== confirmarEmail) {
      Alert.alert("Erro", "Os novos e-mails não coincidem.");
      return;
    }
    if (novaSenha) {
      if (novaSenha !== confirmarNovaSenha) {
        Alert.alert("Erro", "A nova senha e a confirmação não coincidem.");
        return;
      }
      if (passwordStrength !== "Forte") {
        Alert.alert("Senha Fraca", "A nova senha não atende aos requisitos.");
        return;
      }
    }
    // Obriga a senha atual se mudar email ou senha
    if ((novoEmail || novaSenha) && !senhaAtual) {
      Alert.alert("Atenção", "Para salvar, digite sua SENHA ATUAL.");
      return;
    }

    // Se nada mudou
    if (!novoEmail && !novaSenha && image === user.photoURL) {
      setEditando(false);
      return;
    }

    setLoading(true);

    try {
      const promessas = [];

      // 1. Reautenticação (Login silencioso para confirmar identidade)
      if (novoEmail || novaSenha) {
        const credential = EmailAuthProvider.credential(
          user.email!,
          senhaAtual
        );
        await reauthenticateWithCredential(user, credential);
      }

      // 2. Atualizar Email (Login e Banco de Dados)
      if (novoEmail && novoEmail !== user.email) {
        // Atualiza Auth
        promessas.push(updateEmail(user, novoEmail));

        // Atualiza Firestore (Database)
        const userRef = doc(db, "clientes", user.uid);
        promessas.push(updateDoc(userRef, { email: novoEmail }));
      }

      // 3. Atualizar Senha
      if (novaSenha) {
        promessas.push(updatePassword(user, novaSenha));
      }

      // 4. Atualizar Foto
      if (image !== user.photoURL) {
        promessas.push(updateProfile(user, { photoURL: image }));
      }

      await Promise.all(promessas);

      Alert.alert("Sucesso", "Perfil atualizado!");

      // Limpeza e UI
      limparFormulario();
      setEditando(false);
      scrollViewRef.current?.scrollTo({ y: 0, animated: true });
    } catch (error: any) {
      console.error("ERRO UPDATE:", error.code, error.message);

      const erroSenha = [
        "auth/wrong-password",
        "auth/invalid-credential",
        "auth/invalid-login-credentials",
      ];

      if (erroSenha.includes(error.code)) {
        Alert.alert("Senha Incorreta", "A senha ATUAL digitada está errada.");
      } else if (error.code === "auth/email-already-in-use") {
        Alert.alert("E-mail em uso", "Este e-mail já pertence a outra conta.");
      } else if (error.code === "auth/operation-not-allowed") {
        Alert.alert(
          "Erro no Firebase",
          "A proteção de e-mail ainda parece ativa no console. Aguarde alguns minutos."
        );
      } else {
        Alert.alert("Erro", "Não foi possível atualizar: " + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const limparFormulario = () => {
    setNovoEmail("");
    setConfirmarEmail("");
    setSenhaAtual("");
    setNovaSenha("");
    setConfirmarNovaSenha("");
    setPasswordStrength("");
    setPasswordRequirements(initialRequirements);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.replace("/");
    } catch (error) {
      Alert.alert("Erro", "Não foi possível sair.");
    }
  };

  return (
    <LinearGradient
      colors={colors.fundo as [string, string]}
      style={styles.container}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          ref={scrollViewRef}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.header}>
            <Text style={styles.headerTitle}>MEU PERFIL</Text>
          </View>

          {/* Card de Foto */}
          <View style={styles.profileSection}>
            <TouchableOpacity
              onPress={editando ? pickImage : undefined}
              style={styles.imageContainer}
            >
              {image ? (
                <Image source={{ uri: image }} style={styles.profileImage} />
              ) : (
                <View style={styles.placeholderImage}>
                  <FontAwesome name="user" size={50} color="#888" />
                </View>
              )}
              {editando && (
                <View style={styles.editIconBadge}>
                  <FontAwesome name="camera" size={14} color="#000" />
                </View>
              )}
            </TouchableOpacity>

            <Text style={styles.userName}>
              {user?.displayName || "Usuário"}
            </Text>
            <Text style={styles.userEmail}>{user?.email}</Text>
          </View>

          {/* Formulário */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Dados de Acesso</Text>
              <TouchableOpacity
                onPress={() => {
                  setEditando(!editando);
                  if (editando) limparFormulario();
                }}
              >
                <Text style={styles.editText}>
                  {editando ? "Cancelar" : "Editar"}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.cardBody}>
              {!editando && (
                <View>
                  <Text style={styles.label}>E-mail atual</Text>
                  <Text style={styles.readOnlyText}>{user?.email}</Text>
                  <Text style={[styles.label, { marginTop: 15 }]}>Senha</Text>
                  <Text style={styles.readOnlyText}>********</Text>
                </View>
              )}

              {editando && (
                <>
                  <Text style={styles.sectionHeader}>Alterar E-mail</Text>
                  <Text style={styles.label}>Novo E-mail</Text>
                  <TextInput
                    style={styles.input}
                    value={novoEmail}
                    onChangeText={setNovoEmail}
                    placeholder="exemplo@email.com"
                    placeholderTextColor="#666"
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                  {novoEmail.length > 0 && (
                    <>
                      <Text style={styles.label}>Confirmar Novo E-mail</Text>
                      <TextInput
                        style={styles.input}
                        value={confirmarEmail}
                        onChangeText={setConfirmarEmail}
                        placeholder="Repita o e-mail"
                        placeholderTextColor="#666"
                        keyboardType="email-address"
                        autoCapitalize="none"
                      />
                    </>
                  )}

                  <View style={styles.divider} />
                  <Text style={styles.sectionHeader}>Alterar Senha</Text>

                  <Text style={styles.label}>Senha Atual (Obrigatório)</Text>
                  <View style={styles.passwordContainer}>
                    <TextInput
                      style={styles.passwordInput}
                      value={senhaAtual}
                      onChangeText={setSenhaAtual}
                      placeholder="Sua senha antiga"
                      placeholderTextColor="#666"
                      secureTextEntry={!showSenhaAtual}
                    />
                    <TouchableOpacity
                      onPress={() => setShowSenhaAtual(!showSenhaAtual)}
                    >
                      <Ionicons
                        name={showSenhaAtual ? "eye-off" : "eye"}
                        size={20}
                        color="#888"
                      />
                    </TouchableOpacity>
                  </View>

                  <Text style={styles.label}>Nova Senha</Text>
                  <View style={styles.passwordContainer}>
                    <TextInput
                      style={styles.passwordInput}
                      value={novaSenha}
                      onChangeText={handlePasswordChange}
                      placeholder="Nova senha segura"
                      placeholderTextColor="#666"
                      secureTextEntry={!showNovaSenha}
                    />
                    <TouchableOpacity
                      onPress={() => setShowNovaSenha(!showNovaSenha)}
                    >
                      <Ionicons
                        name={showNovaSenha ? "eye-off" : "eye"}
                        size={20}
                        color="#888"
                      />
                    </TouchableOpacity>
                  </View>

                  {novaSenha.length > 0 && (
                    <View style={styles.strengthContainer}>
                      <Text style={styles.strengthLabel}>
                        Força:{" "}
                        <Text
                          style={{
                            color: getStrengthColor(passwordStrength),
                            fontWeight: "bold",
                          }}
                        >
                          {passwordStrength}
                        </Text>
                      </Text>
                      <View style={styles.requirementsBox}>
                        <PasswordRequirement
                          met={passwordRequirements.length}
                          text="Mínimo 8 caracteres"
                        />
                        <PasswordRequirement
                          met={passwordRequirements.uppercase}
                          text="Letra Maiúscula"
                        />
                        <PasswordRequirement
                          met={passwordRequirements.lowercase}
                          text="Letra Minúscula"
                        />
                        <PasswordRequirement
                          met={passwordRequirements.number}
                          text="Números (min. 2)"
                        />
                        <PasswordRequirement
                          met={passwordRequirements.specialChar}
                          text="Caractere Especial"
                        />
                      </View>
                    </View>
                  )}

                  {novaSenha.length > 0 && (
                    <>
                      <Text style={styles.label}>Confirmar Nova Senha</Text>
                      <View style={styles.passwordContainer}>
                        <TextInput
                          style={styles.passwordInput}
                          value={confirmarNovaSenha}
                          onChangeText={setConfirmarNovaSenha}
                          placeholder="Repita a nova senha"
                          placeholderTextColor="#666"
                          secureTextEntry={!showConfSenha}
                        />
                        <TouchableOpacity
                          onPress={() => setShowConfSenha(!showConfSenha)}
                        >
                          <Ionicons
                            name={showConfSenha ? "eye-off" : "eye"}
                            size={20}
                            color="#888"
                          />
                        </TouchableOpacity>
                      </View>
                      {confirmarNovaSenha.length > 0 && (
                        <Text
                          style={{
                            color:
                              novaSenha === confirmarNovaSenha
                                ? "#4CAF50"
                                : "#FF4444",
                            fontSize: 12,
                            marginBottom: 10,
                          }}
                        >
                          {novaSenha === confirmarNovaSenha
                            ? "✓ Senhas coincidem"
                            : "✗ Senhas não coincidem"}
                        </Text>
                      )}
                    </>
                  )}

                  <TouchableOpacity
                    style={styles.saveButton}
                    onPress={handleSalvarAlteracoes}
                    disabled={loading}
                  >
                    {loading ? (
                      <ActivityIndicator color="#000" />
                    ) : (
                      <Text style={styles.saveButtonText}>
                        SALVAR ALTERAÇÕES
                      </Text>
                    )}
                  </TouchableOpacity>
                </>
              )}
            </View>
          </View>

          <View style={styles.actionsContainer}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => router.push("/(tabs)/AlterarConta")}
            >
              <View style={styles.actionIcon}>
                <MaterialIcons
                  name="attach-money"
                  size={24}
                  color={colors.yellow}
                />
              </View>
              <Text style={styles.actionText}>Dados Bancários</Text>
              <MaterialIcons name="chevron-right" size={24} color="#666" />
            </TouchableOpacity>

            {/* Botão Configurações avançadas */}
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => router.push("/Configuracao")}
            >
              <Text style={styles.actionText}>Configurações Avançadas</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.logoutButton}
              onPress={handleLogout}
            >
              <Text style={styles.logoutText}>Sair do aplicativo</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { paddingBottom: 40 },
  header: { paddingTop: 50, paddingBottom: 20, alignItems: "center" },
  headerTitle: { color: colors.yellow, fontSize: 22, fontWeight: "bold" },
  profileSection: { alignItems: "center", marginBottom: 30 },
  imageContainer: { position: "relative", marginBottom: 15 },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: colors.yellow,
  },
  placeholderImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#333",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#444",
  },
  editIconBadge: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: colors.yellow,
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#000",
  },
  userName: { color: "#FFF", fontSize: 24, fontWeight: "bold" },
  userEmail: { color: "#AAA", fontSize: 16, marginTop: 4 },
  card: {
    backgroundColor: "rgba(26, 26, 26, 0.8)",
    marginHorizontal: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#333",
    marginBottom: 20,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  cardTitle: { color: "#FFF", fontSize: 16, fontWeight: "bold" },
  editText: { color: colors.yellow, fontSize: 14 },
  cardBody: { padding: 16 },
  sectionHeader: {
    color: colors.yellow,
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 10,
    textTransform: "uppercase",
    marginTop: 5,
  },
  label: { color: "#888", fontSize: 14, marginBottom: 8 },
  readOnlyText: { color: "#DDD", fontSize: 16, marginBottom: 5 },
  input: {
    backgroundColor: "#222",
    color: "#FFF",
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#444",
  },
  passwordContainer: {
    backgroundColor: "#222",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#444",
    marginBottom: 15,
    paddingHorizontal: 12,
  },
  passwordInput: { flex: 1, color: "#FFF", paddingVertical: 12 },
  saveButton: {
    backgroundColor: colors.yellow,
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  saveButtonText: { color: "#000", fontWeight: "bold", fontSize: 16 },
  actionsContainer: { marginHorizontal: 20, gap: 15 },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(26, 26, 26, 0.8)",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#333",
  },
  actionIcon: {
    width: 40,
    height: 40,
    backgroundColor: "#333",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  actionText: { flex: 1, color: "#FFF", fontSize: 16, fontWeight: "600" },
  logoutButton: { padding: 15, alignItems: "center", marginTop: 10 },
  logoutText: { color: "#FF4444", fontSize: 16 },
  strengthContainer: {
    backgroundColor: "#222",
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#333",
  },
  strengthLabel: { color: "#BBB", marginBottom: 5, fontSize: 13 },
  requirementsBox: { marginTop: 5 },
  requirementText: { fontSize: 12, marginBottom: 2 },
  divider: { height: 1, backgroundColor: "#333", marginVertical: 15 },
});
