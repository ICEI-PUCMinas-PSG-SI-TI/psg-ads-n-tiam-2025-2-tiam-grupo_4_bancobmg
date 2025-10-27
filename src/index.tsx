
import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../src/firebase.js";


export default function ConfiguracoesScreen() {
  const userId = 1;
  const [nome, setNome] = useState("");
  const [notificacoes, setNotificacoes] = useState(false);
  const [atualizacaoAutomatica, setAtualizacaoAutomatica] = useState(false);
  const [cacheAtivo, setCacheAtivo] = useState(false);
  const [loading, setLoading] = useState(true);

  const carregarConfiguracoes = async () => {
    try {
      setLoading(true);
      const docRef = doc(db, "settings", `user_${userId}`);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setNome(data.nome ?? "");
        setNotificacoes(!!data.notificacoes);
        setAtualizacaoAutomatica(!!data.atualizacaoAutomatica);
        setCacheAtivo(!!data.cacheAtivo);
      } else {
        console.log("Nenhuma configuração salva ainda, usando padrão.");
      }
    } catch (error) {
      console.error("Erro carregarConfiguracoes:", error);
      Alert.alert("Erro", "Não foi possível carregar as configurações.");
    } finally {
      setLoading(false);
    }
  };

  const salvarConfiguracoes = async () => {
    try {
      const docRef = doc(db, "settings", `user_${userId}`);
      await setDoc(docRef, {
        nome,
        notificacoes,
        atualizacaoAutomatica,
        cacheAtivo,
        updatedAt: new Date().toISOString(),
      }, { merge: true }); 
      Alert.alert("Sucesso", "Configurações salvas com sucesso!");
    } catch (error) {
      console.error("Erro salvarConfiguracoes:", error);
      Alert.alert("Erro", "Falha ao salvar as configurações.");
    }
  };

  useEffect(() => {
    carregarConfiguracoes();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require("../../assets/images/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <Text style={styles.title}>Configurações do Usuário</Text>

      <Text style={styles.label}>Nome:</Text>
      <TextInput
        style={styles.input}
        value={nome}
        onChangeText={setNome}
        placeholder="Digite seu nome"
        placeholderTextColor="#888"
      />

      <View style={styles.option}>
        <Text style={styles.optionText}>Notificações</Text>
        <Switch
          value={notificacoes}
          onValueChange={setNotificacoes}
          thumbColor={notificacoes ? "#FDB913" : "#f4f3f4"}
          trackColor={{ false: "#767577", true: "#FFD966" }}
        />
      </View>

      <View style={styles.option}>
        <Text style={styles.optionText}>Atualização Automática</Text>
        <Switch
          value={atualizacaoAutomatica}
          onValueChange={setAtualizacaoAutomatica}
          thumbColor={atualizacaoAutomatica ? "#FDB913" : "#f4f3f4"}
          trackColor={{ false: "#767577", true: "#FFD966" }}
        />
      </View>

      <View style={styles.option}>
        <Text style={styles.optionText}>Cache Ativo (24h)</Text>
        <Switch
          value={cacheAtivo}
          onValueChange={setCacheAtivo}
          thumbColor={cacheAtivo ? "#FDB913" : "#f4f3f4"}
          trackColor={{ false: "#767577", true: "#FFD966" }}
        />
      </View>

      <TouchableOpacity
        style={[styles.saveButton, loading && { opacity: 0.7 }]}
        onPress={salvarConfiguracoes}
        disabled={loading}
      >
        <Text style={styles.saveButtonText}>
          {loading ? "Carregando..." : "Salvar Configurações"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingHorizontal: 25,
    paddingTop: 40,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 25,
  },
  logo: {
    width: 140,
    height: 70,
  },
  title: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 25,
  },
  label: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    backgroundColor: "#1A1A1A",
    color: "#fff",
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#333",
  },
  option: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#1A1A1A",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  optionText: {
    color: "#fff",
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: "#FDB913",
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 15,
  },
  saveButtonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
});
