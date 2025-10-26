# Registro de Testes de Software

## Escopo

- Os testes abrangeram as funcionalidades de:
  - Tela de indicação de usuários (`index.tsx`)  
  - Copiar link de indicação  
  - Contabilizar downloads realizados através do link  
  - Calcular e exibir bonificação para o usuário  
- Todos os testes foram executados com usuário autenticado e banco de dados Firebase configurado.

## Resumo dos testes 
| Código   | Funcionalidade                       | Descrição do Teste                           | Resultado Esperado                               | Resultado Obtido | Responsável |
| -------- | ------------------------------------ | -------------------------------------------- | ------------------------------------------------ | ---------------- | ----------- |
| **CT06** | Exibir link de indicação             | Abrir a tela e verificar se o link é mostrado corretamente | Link exibido corretamente                        | **Sucesso**      | Mariana     |
| **CT07** | Copiar link de indicação             | Clicar em “Copiar Link”                      | Link copiado para a área de transferência        | **Sucesso**      | Mariana     |
| **CT08** | Compartilhar link e contabilizar download | Enviar link para outro dispositivo e realizar download/cadastro | Download contabilizado corretamente no Firebase | **Sucesso**      | Mariana     |
| **CT09** | Atualizar bonificação do usuário    | Conferir bonificação após downloads          | Bonificação atualizada corretamente              | **Sucesso**      | Mariana     |
| **CT10** | Mensagem de confirmação              | Verificar mensagens ao copiar link e após download | Mensagem de sucesso exibida corretamente        | **Sucesso**      | Mariana     |

## CT06 –Exibir link de indicação 
Descrição: Verificar se o link é mostrado corretamente
Resultado: Link exibido corretamente 


## CT07 -Copiar link de indicação 
Descrição: Clicar em “Copiar Link
Resultado: Link copiado para a área de transferência 


## CT08 -Compartilhar link e contabilizar download
Descrição: Enviar link para outro dispositivo e realizar download
Resultado: Download contabilizado corretamente no Firebase


## CT09 -Atualizar bonificação do usuário 
Descrição: Conferir bonificação após downloads 
Resultado: Bonificação atualizada corretamente 




## CT10 - Mensagem de confirmação 
Descrição:  Verificar mensagens ao copiar link e após download  
Resultado: Mensagem de sucesso exibida corretamente 


