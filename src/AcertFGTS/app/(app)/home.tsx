import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Tela Principal (Home)</Text>
      <Text style={styles.subtext}>Você está logado!</Text>
      <TouchableOpacity
            style={styles.button}
              onPress={() => router.push("/Saque/Saque" as any)}
            >
        <Text>Sacar</Text>
      </TouchableOpacity>

      <TouchableOpacity
            style={styles.button}
              onPress={() => router.push("/indicacao" as any)}
            >
        <Text>Indicar</Text>
      </TouchableOpacity>

      <TouchableOpacity
            style={styles.button}
              onPress={() => router.push("/(config)/index" as any)}
            >
        <Text>Configurar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1c1c1c",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  subtext: {
    fontSize: 16,
    color: "#ccc",
    marginTop: 8,
  },
  button: {
    borderRadius: 8,
    padding: 10,
    marginTop: 10,
    backgroundColor: "#FFC107"
  }
});
