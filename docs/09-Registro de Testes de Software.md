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

## CT06 – Exibir link de indicação
- **Descrição:** Verificar se o link é mostrado corretamente  
- **Resultado:** Link exibido corretamente  
<img alt="Imagem" src="https://github.com/user-attachments/assets/1edb2be8-1afd-423e-848b-6078e1eb8fe2" width="300" />

## CT07 – Copiar link de indicação
- **Descrição:** Clicar em “Copiar Link”  
- **Resultado:** Link copiado para a área de transferência  
 <img alt="Imagem" src="https://github.com/user-attachments/assets/c7852938-d884-4947-8693-7f32d7bef66e" width="300" />


## CT08 – Compartilhar link e contabilizar download
- **Descrição:** Enviar link para outro dispositivo e realizar download  
- **Resultado:** Download contabilizado corretamente no Firebase  
 <img alt="Imagem" src="https://github.com/user-attachments/assets/0448f4a8-9c3e-497d-8676-48a8610f5dae" width="300" /> 


## CT09 – Atualizar bonificação do usuário
- **Descrição:** Conferir bonificação após downloads  
- **Resultado:** Bonificação atualizada corretamente  
 <img alt="Imagem" src="https://github.com/user-attachments/assets/fbc58260-5cde-4127-a4e7-acccd05a491b" width="300" />
  <img alt="Imagem" src="https://github.com/user-attachments/assets/442abae3-a070-4ab9-9c30-89b176a77e90" width="300" />







