import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { addDoc, collection, getDocs, limit, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { PROMPTS } from "../assets/prompts";
import { auth, db } from "../firebaseConfig";
import colors from "./styles/colors";

export default function SaqueScreen() {
  const [valor, setValor] = useState("");
  const [saldo, setSaldo] = useState(0);
  const [conta, setConta] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [solicitando, setSolicitando] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) await carregarDadosUsuario(user.uid);
      else setLoading(false);
    });
    return unsubscribe;
  }, []);

  const carregarDadosUsuario = async (userId: string) => {
    try {
      setLoading(true);
      const saldoRef = collection(db, "saldos_fgts");
      const qSaldo = query(saldoRef, where("id_cliente", "==", userId), limit(1));
      const querySnapshot = await getDocs(qSaldo);
      setSaldo(!querySnapshot.empty ? querySnapshot.docs[0].data().valor : 0);

      const contasRef = collection(db, "contas_bancarias");
      const qConta = query(contasRef, where("id_cliente", "==", userId), limit(1));
      const contaSnapshot = await getDocs(qConta);
      if (!contaSnapshot.empty) {
        const contaData = contaSnapshot.docs[0].data();
        setConta({ id: contaSnapshot.docs[0].id, ...contaData });
      } else setConta(null);
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
      Alert.alert("Erro", PROMPTS.SAQUE.ERRO_PROCESSAR);
    } finally {
      setLoading(false);
    }
  };

  const handleSaque = async () => {
    if (!valor || parseFloat(valor) <= 0) {
      Alert.alert("Erro", PROMPTS.SAQUE.VALOR_INVALIDO);
      return;
    }

    const valorSaque = parseFloat(valor);
    if (valorSaque > saldo) {
      Alert.alert("Erro", PROMPTS.SAQUE.SALDO_INSUFICIENTE);
      return;
    }

    if (!conta) {
      Alert.alert(
        "Conta Não Configurada",
        PROMPTS.SAQUE.CONTA_NAO_CADASTRADA,
        [
          { text: "Cancelar", style: "cancel" },
          { text: "Cadastrar Conta", onPress: () => router.push("/AlterarConta") },
        ]
      );
      return;
    }

    Alert.alert(
      "Confirmação",
      PROMPTS.SAQUE.CONFIRMAR_SAQUE(
        valorSaque,
        conta.banco,
        conta.agencia,
        conta.numero_conta,
        conta.tipo_conta
      ),
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Confirmar", onPress: async () => await confirmarSaque(valorSaque) },
      ]
    );
  };

  const confirmarSaque = async (valorSaque: number) => {
    setSolicitando(true);
    try {
      const user = auth.currentUser;
      if (!user) {
        Alert.alert("Erro", PROMPTS.SAQUE.USUARIO_NAO_AUTENTICADO);
        return;
      }

      await addDoc(collection(db, "solicitacoes_saque"), {
        id_cliente: user.uid,
        id_conta: conta.id,
        valor: valorSaque,
        data_solicitacao: new Date(),
        status: "PENDENTE",
      });

      Alert.alert("Sucesso", PROMPTS.SAQUE.SUCESSO(valorSaque), [
        { text: "OK", onPress: () => setValor("") },
      ]);
    } catch (error) {
      console.error("Erro ao solicitar saque:", error);
      Alert.alert("Erro", PROMPTS.SAQUE.ERRO_PROCESSAR);
    } finally {
      setSolicitando(false);
    }
  };

  if (loading) {
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
        <Image source={require("../assets/images/logo.png")} style={styles.logo} resizeMode="contain" />
      </View>

      {/* Conteúdo Centralizado */}
      <View style={styles.content}>
        {/* Título */}
        <Text style={styles.title}>SAQUE</Text>

        {/* Card de saldo */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Saldo disponível FGTS</Text>
          </View>
          <View style={styles.cardBody}>
            <Text style={styles.saldoValor}>R$ {saldo.toFixed(2)}</Text>
          </View>
        </View>

        {/* Card de entrada */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Valor do saque</Text>
          </View>
          <View style={styles.cardBody}>
            <TextInput
              style={styles.input}
              placeholder="Digite o valor"
              placeholderTextColor="#888"
              keyboardType="numeric"
              value={valor}
              onChangeText={setValor}
            />
            <Text style={styles.contaInfo}>
              {conta 
                ? `Conta final ${conta.numero_conta} – ${conta.banco} (${conta.tipo_conta === 'corrente' ? 'Corrente' : 'Poupança'})`
                : "Nenhuma conta cadastrada"
              }
            </Text>
          </View>
        </View>

        {/* Botão principal */}
        <TouchableOpacity 
          style={[
            styles.primaryButton, 
            (!valor || solicitando) && styles.buttonDisabled
          ]} 
          onPress={handleSaque}
          disabled={!valor || solicitando}
        >
          {solicitando ? (
            <ActivityIndicator size="small" color="#000" />
          ) : (
            <Text style={styles.primaryButtonText}>Sacar agora</Text>
          )}
        </TouchableOpacity>

        {/* Link secundário */}
        <TouchableOpacity 
          style={styles.secondaryButton} 
          onPress={() => router.push("/AlterarConta")}
        >
          <Text style={styles.secondaryButtonText}>
            {conta ? "Alterar conta de recebimento" : "Cadastrar conta de recebimento"}
          </Text>
        </TouchableOpacity>
                
                {/* Botão de Cancelar */}
<TouchableOpacity
  style={styles.secondaryButton}
  onPress={() => router.push("/(tabs)/Home")}
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
  saldoValor: {
    color: "#FFF",
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
  },
  input: {
    height: 56,
    backgroundColor: "#2A2A2A",
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 18,
    color: "#FFF",
    borderWidth: 1,
    borderColor: "#444",
    marginBottom: 16,
    textAlign: "center",
  },
  contaInfo: {
    color: "#888",
    fontSize: 16,
    textAlign: "center",
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
    textDecorationLine: "underline",
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