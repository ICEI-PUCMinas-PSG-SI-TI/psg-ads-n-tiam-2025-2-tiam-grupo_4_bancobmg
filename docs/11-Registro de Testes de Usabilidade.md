# Registro de Testes de Usabilidade

Objetivo

Avaliar a usabilidade, clareza da interface e eficiência de uso das telas de Alteração de Conta Bancária e Solicitação de Saque, verificando se o usuário consegue realizar as operações de forma intuitiva e sem erros.

## Casos de Teste – index.tsx

| Código   | Caso                                | Ação                                           | Resultado Obtido                                      | Observações                                  |
| -------- | ----------------------------------- | --------------------------------------------- | ----------------------------------------------------- | -------------------------------------------- |
| **CT01** | Carregar tela de login               | Abrir app e navegar para a tela de login      | ✅ Tela carregou corretamente com campos visíveis    | Funcionamento conforme esperado              |
| **CT02** | Inserir credenciais válidas         | Preencher e-mail e senha válidos e clicar em “Entrar” | ✅ Usuário autenticado e redirecionado para tela principal | Login realizado com sucesso                  |
| **CT03** | Inserir credenciais inválidas       | Inserir e-mail ou senha incorretos e confirmar | ✅ Mensagem de erro exibida: “Usuário ou senha inválidos” | Feedback claro para o usuário                |
| **CT04** | Recuperar senha                      | Clicar em “Esqueci a senha” e seguir instruções | ✅ Sistema enviou instruções de recuperação por e-mail | Fluxo de recuperação funcionando corretamente |
| **CT05** | Navegação geral                      | Alternar entre Login e tela de Cadastro       | ✅ Navegação fluida, sem travamentos                  | Consistência visual e responsividade         |

## Casos de Teste – AlterarConta.tsx

| Código   | Caso                        | Ação                                          | Resultado Obtido                                      | Observações                                  |
| -------- | --------------------------- | --------------------------------------------- | ----------------------------------------------------- | -------------------------------------------- |
| **CT01** | Carregar conta existente    | Abrir tela “Alterar Conta” com usuário logado | ✅ Exibiu corretamente os dados bancários salvos       | Funcionamento conforme esperado              |
| **CT02** | Cadastrar nova conta        | Preencher todos os campos e salvar            | ✅ Novo documento criado na coleção `contas_bancarias` | Salvo corretamente no Firestore              |
| **CT03** | Atualizar conta existente   | Alterar dados e salvar                        | ✅ Documento existente atualizado                      | Mudanças refletidas imediatamente no console |
| **CT04** | Validar campos obrigatórios | Tentar salvar sem preencher todos os campos   | ✅ Alert/Toast exibido informando campos obrigatórios  | Mensagem clara e compreensível               |
| **CT05** | Cancelar operação           | Tocar em “Cancelar”                           | ✅ Retornou à tela anterior sem salvar alterações      | Fluxo de cancelamento correto                |


## Casos de Teste – Saque.tsx

| Código   | Caso                                 | Ação                                          | Resultado Obtido                                                      | Observações                                   |
| -------- | ------------------------------------ | --------------------------------------------- | --------------------------------------------------------------------- | --------------------------------------------- |
| **CT06** | Carregar saldo FGTS                  | Abrir tela “Saque” com usuário logado         | ✅ Saldo atual exibido corretamente, obtido de `saldos_fgts`           | Valor conferido com Firebase Console          |
| **CT07** | Solicitar saque com saldo disponível | Inserir valor válido e confirmar              | ✅ Novo documento criado em `solicitacoes_saque` com status “PENDENTE” | Saque registrado corretamente                 |
| **CT08** | Tentar sacar sem conta cadastrada    | Inserir valor e confirmar sem conta existente | ✅ Exibiu mensagem solicitando cadastro de conta                       | Mensagem clara para o usuário                 |
| **CT09** | Tentar sacar valor maior que o saldo | Inserir valor acima do saldo atual            | ✅ Exibiu mensagem de “Saldo insuficiente”                             | Comportamento esperado                        |
| **CT10** | Validar valor do saque               | Inserir campo vazio ou 0                      | ✅ Exibiu mensagem de erro “Digite um valor válido”                    | Validação de entrada funcionando corretamente |
                  

## Registro de Testes Executados

| Data           | Teste                                       | Resultado | Responsável |
| -------------- | ------------------------------------------- | --------- | ----------- |
| **21/10/2025** | CT01 – Carregar tela de login               | Sucesso   | Robson      |
| **21/10/2025** | CT03 – Inserir credenciais inválidas       | Sucesso   | Robson      |
| **21/10/2025** | CT04 – Recuperar senha                      | Sucesso   | Robson      |
| **21/10/2025** | CT05 – Navegação geral                      | Sucesso   | Robson      |
| **22/10/2025** | CT02 – Inserir credenciais válidas         | Sucesso   | Robson      |
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



## Conclusão

- Os testes de usabilidade indicaram que o sistema é intuitivo, funcional e responsivo, permitindo ao usuário realizar cadastros e solicitações de saque de forma fluida.
- As principais recomendações de melhoria incluem:

- Implementar máscara de formatação para campos de agência e conta.

- Adicionar ícones visuais nas mensagens de sucesso/erro.

- Incluir animações sutis de carregamento para reforçar feedback visual.

- Resultado Final: O sistema atende aos critérios de usabilidade e está aprovado para uso.
- Data de Execução dos Testes: 21/10/2025,22/10/2025, 26/10/2025
- Responsável: Pedro, Robson.
> **Links Úteis**:
> - [Ferramentas de Testes de Usabilidade](https://www.usability.gov/how-to-and-tools/resources/templates.html)
