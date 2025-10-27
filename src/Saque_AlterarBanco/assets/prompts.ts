
export const PROMPTS = {
  ALTERAR_CONTA: {
    CONFIRMAR_SALVAR: (banco: string, agencia: string, conta: string, tipo: string) =>
      `Confirme se os dados estão corretos antes de salvar.\n\nBanco: ${banco}\nAgência: ${agencia}\nConta: ${conta} (${tipo})\n\nDeseja continuar?`,

    SUCESSO_NOVA: "Conta cadastrada com sucesso! Agora você pode receber seus saques nesta conta.",
    SUCESSO_ATUALIZAR: "Os dados da sua conta foram atualizados com sucesso!",

    CAMPOS_VAZIOS: "Preencha todos os campos antes de continuar.",
    USUARIO_NAO_AUTENTICADO: "Erro ao identificar usuário. Faça login novamente.",
    ERRO_SALVAR: "Não foi possível salvar os dados da conta. Tente novamente mais tarde.",

    SAIR_SEM_SALVAR:
      "Você fez alterações não salvas.\nDeseja realmente sair sem salvar?",
  },

  SAQUE: {
    CONFIRMAR_SAQUE: (valor: number, banco: string, agencia: string, conta: string, tipo: string) =>
      `Deseja solicitar o saque de R$ ${valor.toFixed(2)}?\n\nO valor será transferido para:\nBanco ${banco}\nAgência ${agencia}\nConta ${conta} (${tipo})`,

    SUCESSO: (valor: number) =>
      `Saque de R$ ${valor.toFixed(2)} solicitado com sucesso!\nO valor será transferido para sua conta em até 2 dias úteis.`,

    VALOR_INVALIDO: "Digite um valor válido para saque.",
    SALDO_INSUFICIENTE: "Saldo insuficiente. Verifique seu saldo e tente novamente.",
    CONTA_NAO_CADASTRADA:
      "Nenhuma conta bancária cadastrada.\nCadastre uma conta antes de solicitar um saque.",
    USUARIO_NAO_AUTENTICADO: "Usuário não autenticado. Faça login novamente.",
    ERRO_PROCESSAR: "Não foi possível processar sua solicitação. Tente novamente em alguns instantes.",

    DICA: "Lembre-se: apenas contas em seu nome podem ser usadas para o recebimento do saque.",
  },
};
