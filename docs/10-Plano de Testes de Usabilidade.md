# Plano de Testes de Usabilidade

## Casos de Teste – AlterarConta.tsx

| Código   | Caso                        | Ação                                          | Resultado Esperado                                 |
| -------- | --------------------------- | --------------------------------------------- | -------------------------------------------------- |
| **CT01** | Carregar conta existente    | Abrir tela “Alterar Conta” com usuário logado | Exibir dados bancários salvos do usuário           |
| **CT02** | Cadastrar nova conta        | Preencher todos os campos e salvar            | Criar novo documento na coleção `contas_bancarias` |
| **CT03** | Atualizar conta existente   | Alterar dados e salvar                        | Atualizar o documento existente no Firestore       |
| **CT04** | Validar campos obrigatórios | Tentar salvar sem preencher todos os campos   | Exibir mensagem de erro via Alert/Toast            |
| **CT05** | Cancelar operação           | Tocar em “Cancelar”                           | Retornar à tela anterior sem salvar alterações     |


## Casos de Teste – Saque.tsx

| Código   | Caso                                 | Ação                                          | Resultado Esperado                                                 |
| -------- | ------------------------------------ | --------------------------------------------- | ------------------------------------------------------------------ |
| **CT06** | Carregar saldo FGTS                  | Abrir tela “Saque” com usuário logado         | Exibir saldo atual do usuário obtido de `saldos_fgts`              |
| **CT07** | Solicitar saque com saldo disponível | Inserir valor válido e confirmar              | Criar novo documento em `solicitacoes_saque` com status “PENDENTE” |
| **CT08** | Tentar sacar sem conta cadastrada    | Inserir valor e confirmar sem conta existente | Exibir mensagem solicitando cadastro de conta                      |
| **CT09** | Tentar sacar valor maior que o saldo | Inserir valor acima do saldo atual            | Exibir mensagem de “Saldo insuficiente”                            |
| **CT10** | Validar valor do saque               | Inserir campo vazio ou 0                      | Exibir mensagem de erro “Digite um valor válido”                   |
| **CT11** | Atualizar saldo após saque (futuro)  | Confirmar saque aprovado (admin)              | Diminuir valor do saldo do usuário (implementação futura)          |



## Registros de Testes

| Data           | Teste                                       | Resultado | Responsável |
| -------------- | ------------------------------------------- | --------- | ----------- |
| **26/10/2025** | CT01 – Carregar conta existente             | Sucesso   | Pedro       |
| **26/10/2025** | CT02 – Cadastrar nova conta                 | Sucesso   | Pedro       |
| **26/10/2025** | CT03 – Atualizar conta existente            | Sucesso   | Pedro       |
| **26/10/2025** | CT04 – Validar campos obrigatórios          | Sucesso   | Pedro       |
| **26/10/2025** | CT05 – Cancelar operação                    | Sucesso   | Pedro       |
| **26/10/2025** | CT06 – Carregar saldo FGTS                  | Sucesso   | Pedro       |
| **26/10/2025** | CT07 – Solicitar saque com saldo disponível | Sucesso   | Pedro       |
| **26/10/2025** | CT08 – Tentar sacar sem conta cadastrada    | Sucesso   | Pedro       |
| **26/10/2025** | CT09 – Tentar sacar valor maior que o saldo | Sucesso   | Pedro       |
| **26/10/2025** | CT10 – Validar valor do saque               | Sucesso   | Pedro       |



Observações

Todos os testes foram realizados com usuário autenticado via Firebase Auth.

A sincronização com o Firestore foi validada visualmente via Firebase Console.

Mensagens de sucesso e erro foram verificadas via Toast/Alert, conforme implementado em prompts.ts.
