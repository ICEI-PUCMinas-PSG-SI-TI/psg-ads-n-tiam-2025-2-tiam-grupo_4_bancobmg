import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as Clipboard from "expo-clipboard";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";

import { auth, db } from "../../firebaseConfig"; // Importa auth e db do seu config
import { collection, addDoc, getDocs } from "firebase/firestore";

export default function IndexScreen() {
  const valorPorIndicacao = 10;
  const [totalIndicacoes, setTotalIndicacoes] = useState(0);
  const [link, setLink] = useState("");

  // Gera um novo link único
  const gerarLink = () => {
    const codigo = Math.random().toString(36).substring(2, 8).toUpperCase();
    const novoLink = `https://acert.com/indique-${codigo}`;
    setLink(novoLink);
  };

  // Registrar indicação no Firestore — aceita linkOpcional ou usa o state 'link'
  const registrarIndicacao = async (linkOpcional = link) => {
    if (!linkOpcional) {
      Alert.alert("Erro", "Link inválido ao registrar indicação.");
      return;
    }

    try {
      await addDoc(collection(db, "indicacoes"), {
        link: linkOpcional,
        data: new Date(), // salva como Timestamp
      });
      await buscarIndicacoes();
    } catch (error) {
      console.error("Erro ao registrar indicação:", error);
      Alert.alert("Erro ao registrar indicação", String(error));
    }
  };

  // Copiar link: copia, registra e gera novo link
  const copiarLink = async () => {
    if (!link) {
      Alert.alert("Aviso", "Ainda não há link gerado. Tente novamente.");
      return;
    }

    try {
      await Clipboard.setStringAsync(link);
      Alert.alert("Link copiado!", "O link foi copiado para sua área de transferência.");
      await registrarIndicacao(link);
      gerarLink();
    } catch (error) {
      console.error("Erro ao copiar link:", error);
      Alert.alert("Erro", String(error));
    }
  };
  const navigation = useNavigation();
  
  const voltar = async () => {
    navigation.goBack();
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

  // Inicialização
  useEffect(() => {
    gerarLink();
    buscarIndicacoes();
  }, []);

 
  useEffect(() => {
    Alert.alert(
      "Lembrete ✨",
      "Não se esqueça de indicar um amigo hoje e ganhar R$10 por cada indicação!",
      [{ text: "Ok" }]
    );
  }, []);

  
  useEffect(() => {
    const hora = new Date().getHours();
    const saudacao = hora < 12 ? "Bom dia! ☀️" : hora < 18 ? "Boa tarde! 🌤️" : "Boa noite! 🌙";
    Alert.alert(saudacao, "Seja bem-vindo(a) ao programa de indicações da Acert!");
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

      {/* Texto explicativo */}
      <Text style={styles.description}>
        Convide seus amigos para conhecer a Acert e ganhe R$ {valorPorIndicacao},00 por cada indicação!
      </Text>

      {/* Contadores */}
      <Text style={[styles.description, { marginBottom: 10 }]}>
        Total de indicações: {totalIndicacoes}
      </Text>
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

      <TouchableOpacity onPress={voltar}>
          <Text style={styles.subTitle}>Voltar</Text>
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
  subTitle: {
    color: "#FFD700",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 10,
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
});

