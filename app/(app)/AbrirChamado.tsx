import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
  Timestamp,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { auth, db } from "../../firebaseConfig";
import colors from "../styles/colors";

export default function AbrirChamado() {
  const router = useRouter();
  const user = auth.currentUser;

  const [assunto, setAssunto] = useState("");
  const [descricao, setDescricao] = useState("");
  const [enviando, setEnviando] = useState(false);

  // 🔹 Lista dos chamados do usuário
  const [meusChamados, setMeusChamados] = useState<any[]>([]);
  const [respostas, setRespostas] = useState<any[]>([]);

  // 🔹 Função que carrega chamados + respostas
  const carregarChamados = async () => {
    if (!user) return;

    try {
      console.log("UID do usuário:", user.uid);

      // ----------------------- CHAMADOS DO USUÁRIO -----------------------
      const refChamados = collection(db, "chamados");
      const q = query(
        refChamados,
        where("id_usuario", "==", user.uid),
        orderBy("data_abertura", "desc")
      );

      const snapChamados = await getDocs(q);
      const listaChamados = snapChamados.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      }));

      console.log("Chamados carregados:", listaChamados);
      setMeusChamados(listaChamados);

      // ----------------------- RESPOSTAS -----------------------
      const refRespostas = collection(db, "respostas_chamados");
      const snapRespostas = await getDocs(refRespostas);

      const listaRespostas = snapRespostas.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      }));

      console.log("Respostas carregadas:", listaRespostas);
      setRespostas(listaRespostas);
    } catch (error) {
      console.log("Erro ao carregar chamados:", error);
    }
  };

  useEffect(() => {
    carregarChamados();
  }, []);

  // 🔹 Enviar novo chamado
  const enviarChamado = async () => {
    if (!assunto || !descricao) {
      Alert.alert("Atenção", "Preencha todos os campos!");
      return;
    }

    try {
      setEnviando(true);

      await addDoc(collection(db, "chamados"), {
        id_usuario: user?.uid,
        email_usuario: user?.email,
        assunto,
        descricao,
        status: "ABERTO",
        data_abertura: Timestamp.now(),
      });

      Alert.alert("Sucesso", "Chamado enviado com sucesso!");
      setAssunto("");
      setDescricao("");

      carregarChamados();
    } catch (error) {
      Alert.alert("Erro", "Não foi possível enviar o chamado.");
      console.log(error);
    } finally {
      setEnviando(false);
    }
  };

  return (
    <LinearGradient colors={colors.fundo as [string, string]} style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>ABRIR CHAMADO</Text>

        {/* FORMULÁRIO */}
        <View style={styles.card}>
          <Text style={styles.label}>Assunto</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: Erro no saque, dúvidas, etc."
            placeholderTextColor="#777"
            value={assunto}
            onChangeText={setAssunto}
          />

          <Text style={styles.label}>Descrição</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Descreva detalhadamente o problema..."
            placeholderTextColor="#777"
            value={descricao}
            onChangeText={setDescricao}
            multiline
          />

          <TouchableOpacity
            style={styles.button}
            onPress={enviarChamado}
            disabled={enviando}
          >
            <Text style={styles.buttonText}>
              {enviando ? "Enviando..." : "Enviar Chamado"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* LISTA DOS CHAMADOS DO USUÁRIO */}
        <Text style={styles.title2}>MEUS CHAMADOS</Text>

        {meusChamados.length === 0 && (
          <Text style={styles.info}>Você ainda não abriu nenhum chamado.</Text>
        )}

        {meusChamados.map((c) => (
          <View
            key={c.id}
            style={[
              styles.chamadoCard,
              c.status === "ABERTO"
                ? styles.aberto
                : c.status === "RESPONDIDO"
                ? styles.respondido
                : styles.fechado,
            ]}
          >
            <Text style={styles.chamadoAssunto}>{c.assunto}</Text>
            <Text style={styles.chamadoDescricao}>{c.descricao}</Text>
            <Text style={styles.status}>Status: {c.status}</Text>

            {/* RESPOSTAS DO ADM */}
            {respostas
              .filter(
                (r) =>
                  String(r.id_chamado)?.trim() === String(c.id)?.trim()
              )
              .map((r, index) => (
                <View key={index} style={styles.respostaBox}>
                  <Text style={styles.respostaTitulo}>Resposta do ADM:</Text>
                  <Text style={styles.respostaTexto}>{r.resposta}</Text>

                  {r.data_resposta?.seconds && (
                    <Text style={styles.dataResposta}>
                      {new Date(
                        r.data_resposta.seconds * 1000
                      ).toLocaleString()}
                    </Text>
                  )}
                </View>
              ))}
          </View>
        ))}
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 50,
  },
  title: {
    color: colors.yellow,
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 25,
  },
  info: {
    color: "#aaa",
    textAlign: "center",
    marginTop: 10,
  },
  title2: {
    color: colors.yellow,
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 30,
    marginBottom: 10,
  },
  card: {
    backgroundColor: "rgba(26, 26, 26, 0.85)",
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#333",
  },
  label: {
    color: "#FFF",
    fontSize: 15,
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#222",
    borderRadius: 8,
    padding: 12,
    color: "#FFF",
    borderWidth: 1,
    borderColor: "#444",
    marginBottom: 15,
  },
  textArea: {
    height: 120,
    textAlignVertical: "top",
  },
  button: {
    backgroundColor: colors.yellow,
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 5,
  },
  buttonText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 16,
  },

  // LISTA DOS CHAMADOS
  chamadoCard: {
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#333",
  },
  chamadoAssunto: {
    color: colors.yellow,
    fontSize: 16,
    fontWeight: "bold",
  },
  chamadoDescricao: {
    color: "#ccc",
    marginTop: 5,
    marginBottom: 10,
  },
  status: {
    color: "#FFF",
    fontSize: 14,
    marginBottom: 10,
  },

  // RESPOSTAS
  respostaBox: {
    backgroundColor: "#222",
    padding: 10,
    borderRadius: 8,
    marginTop: 5,
    borderWidth: 1,
    borderColor: "#444",
  },
  respostaTitulo: {
    color: colors.yellow,
    fontWeight: "bold",
    marginBottom: 5,
  },
  respostaTexto: {
    color: "#FFF",
    fontSize: 14,
  },
  dataResposta: {
    color: "#999",
    marginTop: 8,
    fontSize: 12,
  },

  // Cores dos estados
  aberto: { backgroundColor: "rgba(255, 0, 0, 0.20)" },
  respondido: { backgroundColor: "rgba(255, 255, 0, 0.20)" },
  fechado: { backgroundColor: "rgba(0, 255, 0, 0.20)" },
});
