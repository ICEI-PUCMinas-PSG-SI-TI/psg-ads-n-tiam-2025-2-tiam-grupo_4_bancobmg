import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    // Stack é o tipo de navegação de "pilha", ideal para fluxos como o de login.
    <Stack>
      {/* Registra a tela inicial (login) e remove o cabeçalho */}
      <Stack.Screen name="index" options={{ headerShown: false }} />

      {/* Registra a tela de cadastro e também remove o cabeçalho */}
      <Stack.Screen name="cadastro" options={{ headerShown: false }} />

      {/* Registra a tela de recuperação de senha e remove o cabeçalho */}
      <Stack.Screen name="recuperar-senha" options={{ headerShown: false }} />
    </Stack>
  );
}
