# Plano de Testes de Software

## Cenário 1 – Tela de Configurações do Usuário

| **Item** | **Descrição** |
|-----------|----------------|
| **Funcionalidades Avaliadas** | Alteração de nome, ativação/desativação de notificações, atualização automática e cache ativo (24h) |
| **Tela Testada** | `index.tsx` |
| **Requisitos Relacionados** | RF-006 – Ativar/Desativar Notificações; RF-009 – Atualização de Saldos Agendada |
| **Objetivo** | Validar o correto salvamento e sincronização das preferências do usuário no Firebase Firestore |
| **Grupo de Usuários** | Usuário autenticado |
| **Ferramentas Utilizadas** | Expo Go, Firebase Firestore Console, React Native Debugger |
| **Procedimentos Executados** | 1. Acessar a tela de configurações.<br>2. Alterar o nome do usuário.<br>3. Ativar/desativar as opções de Notificações, Atualização Automática e Cache Ativo (24h).<br>4. Clicar em “Salvar Configurações” e verificar mensagem de sucesso.<br>5. Conferir persistência no Firestore. |
| **Critério de Sucesso** | Exibição da mensagem “Configurações salvas com sucesso!” e atualização confirmada no banco de dados |
| **Casos de Teste Executados** | CT06 – Alteração de Nome; CT07 – Ativar/Desativar Notificações; CT08 – Atualização Automática; CT09 – Cache Ativo |
| **Resultado** | ✅ Sucesso |
| **Responsável** | Gabriela |
