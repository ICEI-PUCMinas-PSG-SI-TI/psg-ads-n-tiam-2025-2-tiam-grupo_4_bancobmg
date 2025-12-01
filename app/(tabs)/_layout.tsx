import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { StyleSheet, View } from "react-native";
import colors from "../styles/colors"; // Ajuste o caminho conforme sua pasta styles

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false, // Esconde o header padrão do navegador (já que você tem headers personalizados)
        tabBarStyle: {
          backgroundColor: "#1a1a1a", // Cor de fundo da barra (escura)
          borderTopColor: "#333",
          height: 60, // Altura um pouco maior para conforto
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarActiveTintColor: colors.yellow, // Cor do ícone ativo
        tabBarInactiveTintColor: "#888", // Cor do ícone inativo
        tabBarShowLabel: false, // Esconder texto se quiser só ícones (ou mude para true)
      }}
    >
      {/* 1. Botão Esquerdo: Alterar Conta (Banco) */}
      <Tabs.Screen
        name="AlterarConta"
        options={{
          title: "Conta",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="bank" size={28} color={color} />
          ),
        }}
      />

      {/* 2. Botão do Meio: Home (Início) */}
      <Tabs.Screen
        name="Home" // Isso refere-se ao seu arquivo Home.tsx (renomeado para index.tsx)
        options={{
          title: "Início",
          tabBarIcon: ({ color, focused }) => (
            <View
              style={[styles.homeButton, focused && styles.homeButtonFocused]}
            >
              <FontAwesome
                name="home"
                size={30}
                color={focused ? "#000" : "#FFF"}
              />
            </View>
          ),
          tabBarLabel: "Início",
        }}
      />

      {/* 3. Botão Direito: Perfil */}
      <Tabs.Screen
        name="Perfil"
        options={{
          title: "Perfil",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="user" size={26} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  homeButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#333",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20, // Faz o botão "flutuar" um pouco pra cima
    borderWidth: 2,
    borderColor: "#1a1a1a",
  },
  homeButtonFocused: {
    backgroundColor: colors.yellow, // Fica amarelo quando ativo
    borderColor: colors.yellow,
  },
});
