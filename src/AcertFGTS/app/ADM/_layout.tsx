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
      <Tabs.Screen
        name="home_ADM" // Este nome corresponde ao arquivo 'home_ADM.tsx'
        options={{
          title: "Relatórios",
          tabBarIcon: ({ color }) => (
            <Ionicons name="document" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="manualAuth" // Este nome corresponde ao arquivo 'manualAuth.tsx'
        options={{
          title: "Autenticação",
          tabBarIcon: ({ color }) => (
            <Ionicons name="lock-open-outline" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="saldos" // Este nome corresponde ao arquivo 'saldos.tsx'
        options={{
          title: "Saldos",
          tabBarIcon: ({ color }) => (
            <Ionicons name="cash-outline" size={24} color={color} />
          ),
        }}
      />
      
      <Tabs.Screen
  name="chamados_ADM"
  options={{
    title: "Chamados",
    tabBarIcon: ({ color }) => (
      <Ionicons name="chatbubbles-outline" size={24} color={color} />
    ),
  }}
/>

    </Tabs>
  );
}
