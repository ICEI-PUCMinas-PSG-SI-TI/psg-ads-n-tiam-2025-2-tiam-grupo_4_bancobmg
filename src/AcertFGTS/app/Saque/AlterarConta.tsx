import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { addDoc, collection, doc, getDocs, limit, query, updateDoc, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { PROMPTS } from "../../assets/prompts";
import { auth, db } from "../../firebaseConfig";
import colors from "../styles/colors";

export default function AlterarContaScreen() {
  const [banco, setBanco] = useState("");
  const [agencia, setAgencia] = useState("");
  const [conta, setConta] = useState("");
  const [tipo, setTipo] = useState<"corrente" | "poupanca" | null>(null);
  const [loading, setLoading] = useState(false);
  const [carregando, setCarregando] = useState(true);
  const [contaExistente, setContaExistente] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) await carregarContaExistente(user.uid);
      else setCarregando(false);
    });
    return unsubscribe;
  }, []);

  const carregarContaExistente = async (userId: string) => {
    try {
      const contasRef = collection(db, "contas_bancarias");
      const q = query(contasRef, where("id_cliente", "==", userId), limit(1));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const contaData = querySnapshot.docs[0].data();
        setContaExistente({ id: querySnapshot.docs[0].id, ...contaData });
        setBanco(contaData.banco);
        setAgencia(contaData.agencia);
        setConta(contaData.numero_conta);
        setTipo(contaData.tipo_conta);
      }
    } catch (error) {
      console.error("Erro ao carregar conta:", error);
      Alert.alert("Erro", PROMPTS.ALTERAR_CONTA.ERRO_SALVAR);
    } finally {
      setCarregando(false);
    }
  };

  const handleSalvar = async () => {
    if (!banco || !agencia || !conta || !tipo) {
      Alert.alert("Erro", PROMPTS.ALTERAR_CONTA.CAMPOS_VAZIOS);
      return;
    }

    Alert.alert(
      "Confirmação",
      PROMPTS.ALTERAR_CONTA.CONFIRMAR_SALVAR(banco, agencia, conta, tipo),
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Confirmar", onPress: async () => await salvarConta() },
      ]
    );
  };

  const salvarConta = async () => {
    setLoading(true);
    try {
      const user = auth.currentUser;
      if (!user) {
        Alert.alert("Erro", PROMPTS.ALTERAR_CONTA.USUARIO_NAO_AUTENTICADO);
        return;
      }

      const dadosConta = {
        id_cliente: user.uid,
        banco: banco.trim(),
        agencia: agencia.trim(),
        numero_conta: conta.trim(),
        tipo_conta: tipo,
        data_cadastro: new Date(),
      };

      if (contaExistente) {
        const contaRef = doc(db, "contas_bancarias", contaExistente.id);
        await updateDoc(contaRef, dadosConta);
        Alert.alert("Sucesso", PROMPTS.ALTERAR_CONTA.SUCESSO_ATUALIZAR, [
          { text: "OK", onPress: () => router.back() },
        ]);
      } else {
        await addDoc(collection(db, "contas_bancarias"), dadosConta);
        Alert.alert("Sucesso", PROMPTS.ALTERAR_CONTA.SUCESSO_NOVA, [
          { text: "OK", onPress: () => router.back() },
        ]);
      }
    } catch (error) {
      console.error("Erro ao salvar conta:", error);
      Alert.alert("Erro", PROMPTS.ALTERAR_CONTA.ERRO_SALVAR);
    } finally {
      setLoading(false);
    }
  };

  if (carregando) {
    return (
      <LinearGradient colors={colors.fundo as [string, string]} style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.yellow} />
          <Text style={styles.loadingText}>Carregando...</Text>
        </View>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient 
      colors={colors.fundo as [string, string]}
      style={styles.container}
    >
      {/* Header com Logo */}
      <View style={styles.header}>
        <Image source={require("../../assets/images/logo.png")} style={styles.logo} resizeMode="contain" />
      </View>

      {/* Conteúdo Centralizado */}
      <View style={styles.content}>
        {/* Título */}
        <Text style={styles.title}>ALTERAR CONTA</Text>

        {/* Formulário */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Dados da conta</Text>
          </View>
          <View style={styles.cardBody}>
            <TextInput
              style={styles.input}
              placeholder="Selecione o banco"
              placeholderTextColor="#888"
              value={banco}
              onChangeText={setBanco}
            />
            <TextInput
              style={styles.input}
              placeholder="Digite a agência"
              placeholderTextColor="#888"
              value={agencia}
              onChangeText={setAgencia}
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              placeholder="Digite a conta"
              placeholderTextColor="#888"
              value={conta}
              onChangeText={setConta}
              keyboardType="numeric"
            />

            {/* Seleção de tipo de conta */}
            <Text style={styles.label}>Tipo de conta</Text>
            <View style={styles.tipoContainer}>
              <TouchableOpacity
                style={[styles.tipoBtn, tipo === "corrente" && styles.tipoBtnAtivo]}
                onPress={() => setTipo("corrente")}
              >
                <Text style={[styles.tipoText, tipo === "corrente" && styles.tipoTextAtivo]}>Corrente</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.tipoBtn, tipo === "poupanca" && styles.tipoBtnAtivo]}
                onPress={() => setTipo("poupanca")}
              >
                <Text style={[styles.tipoText, tipo === "poupanca" && styles.tipoTextAtivo]}>Poupança</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Botões */}
        <TouchableOpacity 
          style={[
            styles.primaryButton, 
            loading && styles.buttonDisabled
          ]} 
          onPress={handleSalvar}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#000" />
          ) : (
            <Text style={styles.primaryButtonText}>
              {contaExistente ? "Atualizar conta" : "Salvar nova conta"}
            </Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.secondaryButton} 
          onPress={() => router.back()}
          disabled={loading}
        >
          <Text style={styles.secondaryButtonText}>Cancelar</Text>
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
    paddingTop: 40,
    paddingBottom: 10,
  },
  logo: {
    width: 180,
    height: 90,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: "flex-start",
    paddingTop: 10,
  },
  title: {
    color: colors.yellow,
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 40,
  },
  card: {
    backgroundColor: "rgba(26, 26, 26, 0.8)",
    borderRadius: 12,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#333",
    width: "100%",
  },
  cardHeader: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  cardTitle: {
    color: colors.yellow,
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
  cardBody: {
    padding: 20,
  },
  input: {
    height: 56,
    backgroundColor: "#2A2A2A",
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#FFF",
    borderWidth: 1,
    borderColor: "#444",
    marginBottom: 16,
    textAlign: "center",
  },
  label: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 16,
    textAlign: "center",
  },
  tipoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 16,
  },
  tipoBtn: {
    flex: 1,
    backgroundColor: "#2A2A2A",
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#444",
  },
  tipoBtnAtivo: {
    backgroundColor: colors.yellow,
    borderColor: colors.yellow,
  },
  tipoText: {
    color: "#888",
    fontSize: 16,
    fontWeight: "600",
  },
  tipoTextAtivo: {
    color: "#000",
    fontWeight: "700",
  },
  primaryButton: {
    backgroundColor: colors.yellow,
    borderRadius: 8,
    paddingVertical: 18,
    alignItems: "center",
    marginBottom: 16,
    width: "100%",
  },
  buttonDisabled: {
    backgroundColor: "#666",
    opacity: 0.6,
  },
  primaryButtonText: {
    color: "#000",
    fontSize: 18,
    fontWeight: "bold",
  },
  secondaryButton: {
    paddingVertical: 16,
    alignItems: "center",
    width: "100%",
  },
  secondaryButtonText: {
    color: colors.yellow,
    fontSize: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    color: colors.yellow,
    fontSize: 16,
    marginTop: 10,
  },
});