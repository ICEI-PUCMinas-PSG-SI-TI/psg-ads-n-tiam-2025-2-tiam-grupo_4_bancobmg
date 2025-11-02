import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  Alert,
  Linking,
} from "react-native";
import * as Clipboard from "expo-clipboard";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";

import { db } from "../../config/firebaseConfig";
import { collection, addDoc, getDocs } from "firebase/firestore";

export default function IndexScreen() {
  const link = "https://acert.com/indique123";
  const valorPorIndicacao = 10;
  const [totalIndicacoes, setTotalIndicacoes] = useState(0);

  // Registrar indicação no Firestore
  const registrarIndicacao = async () => {
    try {
      await addDoc(collection(db, "indicacoes"), {
        link,
        data: new Date().toISOString(),
      });
      buscarIndicacoes(); 
    } catch (error) {
      console.error("Erro ao registrar:", error);
      Alert.alert("Erro", "Não foi possível registrar a indicação.");
    }
  };

  // Copiar link
  const copiarLink = async () => {
    await Clipboard.setStringAsync(link);
    Alert.alert("Link copiado!", "O link foi copiado para sua área de transferência.");
    await registrarIndicacao();
  };

  // Abrir WhatsApp
  const abrirWhatsApp = async () => {
    await registrarIndicacao();
    const url = "https://wa.me/?text=" + encodeURIComponent(`Conheça a Acert! ${link}`);
    Linking.openURL(url);
  };

  // Buscar total de indicações
  const buscarIndicacoes = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "indicacoes"));
      setTotalIndicacoes(querySnapshot.size);
    } catch (error) {
      console.error("Erro ao buscar indicações:", error);
    }
  };

  useEffect(() => {
    buscarIndicacoes();
  }, []);

  const totalGanho = totalIndicacoes * valorPorIndicacao;

  return (
    <LinearGradient colors={["#000000", "#1a1a1a"]} style={styles.container}>
      <StatusBar style="light" />

      {/* Logo */}
      <View style={styles.header}>
        <Image
          source={require("../../assets/images/logoacc.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* Título */}
      <Text style={styles.title}>INDIQUE A ACERT</Text>

      {/* Texto combinado (convite + valor ganho) */}
      <Text style={styles.description}>
        Convide seus amigos para conhecer a Acert e ganhe R$ {valorPorIndicacao},00 por cada indicação!
      </Text>

      {/* Contador de indicações */}
      <Text style={[styles.description, { marginBottom: 10 }]}>
        Total de indicações: {totalIndicacoes}
      </Text>

      {/* Valor total */}
      <Text style={[styles.description, { marginBottom: 30 }]}>
        Total ganho: R$ {totalGanho},00
      </Text>

      {/* Card do link */}
      <View style={styles.card}>
        <TextInput style={styles.input} value={link} editable={false} />
        <TouchableOpacity style={styles.button} onPress={copiarLink}>
          <Text style={styles.buttonText}>Copiar link</Text>
        </TouchableOpacity>
      </View>

      {/* Botão do WhatsApp */}
      <TouchableOpacity style={styles.whatsappButton} onPress={abrirWhatsApp}>
        <Image
          source={require("../../assets/images/whatsapp-icon.png")}
          style={styles.whatsappImage}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: "center",
  },
  header: { alignItems: "center", marginBottom: 30 },
  logo: { width: 180, height: 90 },
  title: {
    color: "#FFD700",
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  description: { color: "#FFF", fontSize: 16, textAlign: "center", marginBottom: 20 },
  card: {
    backgroundColor: "rgba(26, 26, 26, 0.8)",
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: "#333",
    marginBottom: 20,
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
  button: {
    backgroundColor: "#FFD700",
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: { color: "#000", fontSize: 18, fontWeight: "bold" },
  whatsappButton: { alignItems: "center", marginTop: 20 },
  whatsappImage: { width: 60, height: 60 },
});

