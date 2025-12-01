import { LinearGradient } from "expo-linear-gradient";
import {
    addDoc,
    collection,
    doc,
    getDocs,
    Timestamp,
    updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
    Alert,
    FlatList,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { db } from "../../firebaseConfig";
import colors from "../styles/colors";

export default function ChamadosADM() {
  const [chamados, setChamados] = useState<any[]>([]);
  const [resposta, setResposta] = useState("");
  const [chamadoSelecionado, setChamadoSelecionado] = useState<any>(null);

  const carregarChamados = async () => {
    try {
      const ref = collection(db, "chamados");
      const docs = await getDocs(ref);
      const lista = docs.docs.map((d) => ({ id: d.id, ...d.data() }));

      // Ordena por data_abertura se existir
      lista.sort((a, b) => {
        const tA = a.data_abertura?.seconds ?? 0;
        const tB = b.data_abertura?.seconds ?? 0;
        return tB - tA;
      });

      setChamados(lista);
    } catch (err) {
      console.log("Erro ao carregar chamados (ADM):", err);
    }
  };

  const enviarResposta = async () => {
    if (!resposta.trim()) {
      Alert.alert("Erro", "Digite uma resposta!");
      return;
    }

    if (!chamadoSelecionado) {
      Alert.alert("Erro", "Nenhum chamado selecionado!");
      return;
    }

    try {
      // Salva a resposta com o campo id_chamado e data_resposta (nomes consistentes)
      await addDoc(collection(db, "respostas_chamados"), {
        id_chamado: chamadoSelecionado.id,
        resposta: resposta.trim(),
        data_resposta: Timestamp.now(),
      });

      // Atualiza status do chamado para RESPONDIDO
      await updateDoc(doc(db, "chamados", chamadoSelecionado.id), {
        status: "RESPONDIDO",
      });

      Alert.alert("Sucesso", "Resposta enviada!");

      // limpar UI e recarregar
      setResposta("");
      setChamadoSelecionado(null);
      await carregarChamados();
    } catch (error) {
      console.log("Erro ao responder chamado (ADM):", error);
      Alert.alert("Erro", "Não foi possível responder o chamado.");
    }
  };

  useEffect(() => {
    carregarChamados();
  }, []);

  return (
    <LinearGradient colors={colors.fundo as [string, string]} style={{ flex: 1 }}>
      <View style={{ padding: 20 }}>
        <Text style={styles.titulo}>CHAMADOS</Text>

        <FlatList
          data={chamados}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.card,
                item.status === "ABERTO"
                  ? styles.cardAberto
                  : item.status === "RESPONDIDO"
                  ? styles.cardRespondido
                  : styles.cardFechado,
              ]}
              onPress={() => setChamadoSelecionado(item)}
            >
              <Text style={styles.assunto}>{item.assunto}</Text>
              <Text style={styles.email}>{item.email_usuario}</Text>
              <Text style={styles.status}>Status: {item.status}</Text>
              {item.data_abertura?.seconds && (
                <Text style={styles.subinfo}>
                  Aberto em: {new Date(item.data_abertura.seconds * 1000).toLocaleString()}
                </Text>
              )}
            </TouchableOpacity>
          )}
        />

        {/* Modal / painel de resposta */}
        {chamadoSelecionado && (
          <View style={styles.modal}>
            <Text style={styles.modalTitulo}>Responder Chamado</Text>
            <Text style={styles.modalAssunto}>{chamadoSelecionado.assunto}</Text>
            <Text style={styles.modalEmail}>{chamadoSelecionado.email_usuario}</Text>
            <Text style={styles.modalAssunto}>{chamadoSelecionado.descricao}</Text>

            <TextInput
              style={styles.input}
              placeholder="Digite sua resposta..."
              placeholderTextColor="#888"
              value={resposta}
              onChangeText={setResposta}
              multiline
            />

            <TouchableOpacity style={styles.btn} onPress={enviarResposta}>
              <Text style={styles.btnText}>Enviar Resposta</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.btn, { backgroundColor: "#444" }]}
              onPress={() => setChamadoSelecionado(null)}
            >
              <Text style={styles.btnText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  titulo: {
    color: colors.yellow,
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
  },
  card: {
    padding: 15,
    marginBottom: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#333",
  },
  cardAberto: { backgroundColor: "rgba(255, 0, 0, 0.18)" },
  cardRespondido: { backgroundColor: "rgba(255, 255, 0, 0.12)" },
  cardFechado: { backgroundColor: "rgba(0, 255, 0, 0.12)" },
  assunto: { color: "#FFF", fontSize: 18, fontWeight: "bold" },
  email: { color: "#AAA", fontSize: 13 },
  subinfo: { color: "#999", fontSize: 12, marginTop: 6 },
  status: { color: "#FFF", fontSize: 14, marginTop: 6 },
 modal: {
  position: "absolute",
  top: 60,
  left: 20,
  right: 20,
  backgroundColor: "#111",
  padding: 16,
  borderRadius: 12,
  borderWidth: 1,
  borderColor: "#333",
  zIndex: 999,
},
  modalTitulo: { color: colors.yellow, fontSize: 18, fontWeight: "bold", marginBottom: 8 },
  modalAssunto: { color: "#FFF", marginBottom: 6 },
  modalEmail: { color: "#AAA", marginBottom: 10 },
  input: {
    backgroundColor: "#222",
    color: "#FFF",
    padding: 12,
    borderRadius: 8,
    minHeight: 100,
    textAlignVertical: "top",
    borderWidth: 1,
    borderColor: "#444",
    marginBottom: 10,
  },
  btn: {
    backgroundColor: colors.yellow,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 6,
  },
  btnText: { color: "#000", fontWeight: "bold" },
});
