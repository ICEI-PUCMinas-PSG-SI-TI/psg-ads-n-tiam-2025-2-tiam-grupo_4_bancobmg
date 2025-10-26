# Registro de Testes de Usabilidade

Objetivo

Avaliar a usabilidade, clareza da interface e eficiência de uso das telas de Alteração de Conta Bancária e Solicitação de Saque, verificando se o usuário consegue realizar as operações de forma intuitiva e sem erros.

## Participantes
- Nome	Perfil	Experiência com Aplicativos	Observações
- Pedro	Usuário principal (testador/desenvolvedor)	Alta (usuário experiente em apps financeiros e desenvolvimento)	Participou de todos os testes e relatou pontos de melhoria de UX.

## Cenários de Teste de Usabilidade
| Código   | Caso de Uso                   | Objetivo                                                                     | Ações Realizadas                                           | Expectativa do Usuário                                             |
| -------- | ----------------------------- | ---------------------------------------------------------------------------- | ---------------------------------------------------------- | ------------------------------------------------------------------ |
| **US01** | Acessar tela de Alterar Conta | Verificar clareza na apresentação dos dados bancários e facilidade de edição | Usuário abre a tela e visualiza informações pré-carregadas | Interface deve ser simples e permitir editar dados sem dificuldade |
| **US02** | Cadastrar nova conta          | Avaliar o fluxo de cadastro e feedback visual                                | Usuário preenche campos e salva                            | Aplicativo deve confirmar sucesso e retornar para tela anterior    |
| **US03** | Solicitar saque               | Avaliar clareza da tela e confirmação de operação                            | Usuário informa valor e confirma saque                     | Sistema deve mostrar mensagem clara de sucesso                     |
| **US04** | Exceções e validações         | Verificar feedback de erros                                                  | Usuário tenta sacar valor maior que o saldo                | Sistema deve exibir mensagem de erro clara (“Saldo insuficiente”)  |
| **US05** | Navegação geral               | Avaliar a fluidez e consistência de navegação                                | Usuário alterna entre as telas de Saque e Alterar Conta    | Aplicativo deve manter responsividade e consistência visual        |

## Resultados Observados

| Código   | Observação                                                               | Resultado                          | Grau de Satisfação (1–5) |
| -------- | ------------------------------------------------------------------------ | ---------------------------------- | ------------------------ |
| **US01** | A tela carregou rapidamente e exibiu corretamente os dados do banco.     | **Sucesso**                        | ⭐⭐⭐⭐⭐                    |
| **US02** | Campos intuitivos, mas recomendada máscara para agência/conta.           | **Sucesso Parcial (com sugestão)** | ⭐⭐⭐⭐☆                    |
| **US03** | A solicitação de saque funcionou conforme esperado, com feedback visual. | **Sucesso**                        | ⭐⭐⭐⭐⭐                    |
| **US04** | As mensagens de erro apareceram de forma clara (via Toast).              | **Sucesso**                        | ⭐⭐⭐⭐⭐                    |
| **US05** | Navegação entre telas fluida e sem travamentos.                          | **Sucesso**                        | ⭐⭐⭐⭐⭐                    |

💬 Relatos dos Usuários

“O fluxo está bem direto e intuitivo. Seria interessante adicionar máscaras para o campo de agência e número da conta.”
— Pedro (Testador)

“As mensagens de sucesso são claras, mas os alertas poderiam ter ícones visuais.”
— Pedro (Testador)

“O layout escuro é confortável e combina com a proposta do app.”
— Pedro (Testador)

## Análise Geral

| Critério           | Descrição                                                       | Avaliação      |
| ------------------ | --------------------------------------------------------------- | -------------- |
| **Eficiência**     | O usuário conseguiu realizar todas as tarefas sem erros graves  |  **Aprovado** |
| **Aprendizado**    | Interface compreendida sem necessidade de instruções adicionais |  **Aprovado** |
| **Memorabilidade** | O fluxo é simples e fácil de repetir após uso inicial           |  **Aprovado** |
| **Erros**          | Erros foram previstos e tratados corretamente                   |  **Aprovado** |
| **Satisfação**     | Usuário considerou a experiência agradável e intuitiva          |  **Aprovado** |

## Conclusão

- Os testes de usabilidade indicaram que o sistema é intuitivo, funcional e responsivo, permitindo ao usuário realizar cadastros e solicitações de saque de forma fluida.
- As principais recomendações de melhoria incluem:

- Implementar máscara de formatação para campos de agência e conta.

- Adicionar ícones visuais nas mensagens de sucesso/erro.

- Incluir animações sutis de carregamento para reforçar feedback visual.

- Resultado Final: O sistema atende aos critérios de usabilidade e está aprovado para uso.
- Data de Execução dos Testes: 26/10/2025
- Responsável: Pedro
> **Links Úteis**:
> - [Ferramentas de Testes de Usabilidade](https://www.usability.gov/how-to-and-tools/resources/templates.html)
