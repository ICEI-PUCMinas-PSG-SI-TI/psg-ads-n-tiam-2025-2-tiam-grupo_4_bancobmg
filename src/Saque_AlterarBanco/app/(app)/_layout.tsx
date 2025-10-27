import { Ionicons } from "@expo/vector-icons"; // Usaremos ícones para as abas
import { Tabs } from "expo-router";
import React from "react";

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
      <Tabs.Screen
        name="home" // Este nome corresponde ao arquivo 'home.tsx'
        options={{
          title: "Início",
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile" // Este nome corresponde ao arquivo 'profile.tsx'
        options={{
          title: "Perfil",
          tabBarIcon: ({ color }) => (
            <Ionicons name="person" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
