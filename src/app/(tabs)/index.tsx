import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import colors from "../styles/colors";

export default function SaqueScreen() {
  const [valor, setValor] = useState("");
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
        <Text style={styles.title}>SAQUE</Text>

        {/* Card de saldo */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Saldo disponível</Text>
          </View>
          <View style={styles.cardBody}>
            <Text style={styles.saldoValor}>R$ 1.000,00</Text>
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
            <Text style={styles.contaInfo}>Conta final 1234 – Banco X</Text>
          </View>
        </View>

        {/* Botão principal */}
        <TouchableOpacity style={styles.primaryButton} onPress={() => alert("Saque realizado!")}>
          <Text style={styles.primaryButtonText}>Sacar agora</Text>
        </TouchableOpacity>

        {/* Link secundário */}
        <TouchableOpacity style={styles.secondaryButton} onPress={() => router.push("/TelaAlterarConta")}>
          <Text style={styles.secondaryButtonText}>Alterar conta de recebimento</Text>
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
});