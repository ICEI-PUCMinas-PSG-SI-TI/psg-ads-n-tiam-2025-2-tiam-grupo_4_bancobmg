import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import colors from "../styles/colors";

export default function AlterarContaScreen() {
  const [banco, setBanco] = useState("");
  const [agencia, setAgencia] = useState("");
  const [conta, setConta] = useState("");
  const [tipo, setTipo] = useState<"corrente" | "poupanca" | null>(null);
  const router = useRouter();

  return (
    <LinearGradient 
      colors={colors.fundo as [string, string]}
      style={styles.container}
    >
      {/* Header com Logo */}
      <View style={styles.header}>
        <Image source={require("@/assets/images/LogoAC.png")} style={styles.logo} resizeMode="contain" />
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
        <TouchableOpacity style={styles.primaryButton} onPress={() => router.back()}>
          <Text style={styles.primaryButtonText}>Salvar nova conta</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryButton} onPress={() => router.back()}>
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
    paddingBottom: 10, // Reduzido para compensar a logo maior
  },
  logo: {
    width: 180, // Aumentado de 120 para 180
    height: 90,  // Aumentado de 60 para 90
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: "flex-start",
    paddingTop: 10, // Reduzido para compensar a logo maior
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
});