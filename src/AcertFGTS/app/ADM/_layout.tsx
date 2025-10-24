import React from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons"; // Usaremos ícones para as abas

export default function AppLayout() {
  return (
    <Tabs
      screenOptions={{
        headerStyle: {
          backgroundColor: "#FFC107", // Cor de fundo do cabeçalho
        },
        headerTintColor: "#000", // Cor do texto do cabeçalho
        tabBarActiveTintColor: "#FFC107", // Cor do ícone da aba ativa
        tabBarInactiveTintColor: "gray", // Cor do ícone da aba inativa
        tabBarStyle: {
          backgroundColor: "#000", // Fundo da barra de abas
        },
      }}
    >
    </Tabs>
  );
}
