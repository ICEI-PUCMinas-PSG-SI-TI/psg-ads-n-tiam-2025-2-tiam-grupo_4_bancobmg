# Registro de Testes de Software – Tela de Indicação

## Objetivo

Avaliar a usabilidade, clareza da interface e eficiência de uso da tela de **Indicação de Usuário**, verificando se o usuário consegue copiar o link, compartilhar, acompanhar downloads e visualizar a bonificação de forma intuitiva e sem erros.

## Casos de Teste – IndicationScreen.tsx

| Código   | Caso                                | Ação                                           | Resultado Obtido                                      | Observações                                  |
| -------- | ----------------------------------- | --------------------------------------------- | ----------------------------------------------------- | -------------------------------------------- |
| **CT06** | Exibir link de indicação            | Abrir a tela de indicação com usuário logado | ✅ Link exibido corretamente                          | Interface clara e link visível               |
| **CT07** | Copiar link de indicação            | Clicar no botão “Copiar Link”                | ✅ Link copiado para a área de transferência         | Funcionalidade funcionando corretamente     |
| **CT08** | Compartilhar link e contabilizar download | Enviar o link para outro dispositivo e realizar download/cadastro | ✅ Download registrado corretamente no Firebase      | Contabilização precisa e confiável           |
| **CT09** | Atualizar bonificação               | Conferir bonificação após downloads          | ✅ Bonificação do usuário atualizada corretamente    | Bonificação refletida em tempo real          |
| **CT10** | Mensagem de confirmação             | Verificar mensagens exibidas ao copiar link ou após download | ✅ Mensagem de sucesso exibida corretamente          | Feedback claro para o usuário                |

## Registros de Testes

| Data           | Teste                                               | Resultado | Responsável |
| -------------- | -------------------------------------------------- | --------- | ----------- |
| **26/10/2025** | CT06 – Exibir link de indicação                     | Sucesso   | Mariana     |
| **26/10/2025** | CT07 – Copiar link de indicação                     | Sucesso   | Mariana     |
| **26/10/2025** | CT08 – Compartilhar link e contabilizar download   | Sucesso   | Mariana     |
| **26/10/2025** | CT09 – Atualizar bonificação do usuário            | Sucesso   | Mariana     |
| **26/10/2025** | CT10 – Verificar mensagens de confirmação          | Sucesso   | Mariana     |

## Conclusão

- Os testes de usabilidade indicaram que o sistema é intuitivo, funcional e responsivo, permitindo ao usuário copiar links, compartilhar, acompanhar downloads e visualizar bonificação de forma fluida.  
- As principais recomendações de melhoria incluem:  
  - Implementar ícones visuais nas mensagens de sucesso/erro ao copiar link ou finalizar download.  
  - Incluir animações sutis de carregamento para reforçar feedback visual.  
  - Garantir confirmação visual ao atualizar a bonificação do usuário.  

- Resultado Final: O sistema atende aos critérios de usabilidade e está aprovado para uso.  
- Data de Execução dos Testes:  26/10/2025  
- Responsável: Mariana
