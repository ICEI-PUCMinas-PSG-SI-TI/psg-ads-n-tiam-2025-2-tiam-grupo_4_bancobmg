# Plano de Testes de Software

## Cenário 1 – Solicitação de Saque FGTS

| Item                          | Descrição                                                                                                      |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------- |
| **Funcionalidades Avaliadas** | Consulta de saldo e criação de solicitações de saque                                                           |
| **Tela Testada**              | `Saque.tsx`                                                                                                    |
| **Requisitos Relacionados**   | O sistema deve permitir ao usuário visualizar o saldo e realizar solicitações de saque                         |
| **Objetivo**                  | Validar o comportamento da aplicação durante o fluxo de saque, incluindo validações e integração com Firestore |
| **Grupo de Usuários**         | Usuário autenticado (com conta bancária cadastrada e saldo positivo)                                           |
| **Ferramentas Utilizadas**    | Expo Go, Firebase Firestore Console, React Developer Tools                                                     |
| **Procedimentos Executados**  | Abrir tela de saque, inserir valor, confirmar operação e verificar registro no Firestore                       |
| **Critério de Sucesso**       | Solicitação criada com sucesso na coleção `solicitacoes_saque` e feedback positivo exibido                     |
| **Casos de Teste Executados** | CT06 – CT11                                                                                                    |
| **Resultado**                 | Sucesso                                                                                                        |
| **Responsável**               | Pedro                                                                                                          |



## Cenário 2 – Gerenciamento de Conta Bancária

| Item                          | Descrição                                                                                               |
| ----------------------------- | ------------------------------------------------------------------------------------------------------- |
| **Funcionalidades Avaliadas** | Cadastro, leitura e atualização de conta bancária                                                       |
| **Tela Testada**              | `AlterarConta.tsx`                                                                                      |
| **Requisitos Relacionados**   | O sistema deve permitir ao usuário cadastrar ou atualizar sua conta bancária para recebimento de saques |
| **Objetivo**                  | Garantir que o usuário consiga salvar e atualizar corretamente suas informações bancárias               |
| **Grupo de Usuários**         | Usuário autenticado (perfil padrão do app)                                                              |
| **Ferramentas Utilizadas**    | Expo Go, Firebase Firestore Console, Expo Router, React Native Debugger                                 |
| **Procedimentos Executados**  | Abrir tela de alteração de conta, inserir dados bancários, confirmar e verificar persistência no banco  |
| **Critério de Sucesso**       | Dados salvos corretamente no Firestore e mensagens de confirmação exibidas                              |
| **Casos de Teste Executados** | CT01 – CT05                                                                                             |
| **Resultado**                 | Sucesso                                                                                                 |
| **Responsável**               | Pedro                                                                                                   |







## Ferramentas de Testes (Opcional)

Comente sobre as ferramentas de testes utilizadas.
 
> **Links Úteis**:
> - [IBM - Criação e Geração de Planos de Teste](https://www.ibm.com/developerworks/br/local/rational/criacao_geracao_planos_testes_software/index.html)
> - [Práticas e Técnicas de Testes Ágeis](http://assiste.serpro.gov.br/serproagil/Apresenta/slides.pdf)
> -  [Teste de Software: Conceitos e tipos de testes](https://blog.onedaytesting.com.br/teste-de-software/)
> - [Criação e Geração de Planos de Teste de Software](https://www.ibm.com/developerworks/br/local/rational/criacao_geracao_planos_testes_software/index.html)
> - [Ferramentas de Test para Java Script](https://geekflare.com/javascript-unit-testing/)
> - [UX Tools](https://uxdesign.cc/ux-user-research-and-user-testing-tools-2d339d379dc7)
