#  Registro de Testes de Software – Tela de Configurações

##  Escopo

Os testes abrangeram as funcionalidades da **Tela de Configurações** (`index.tsx`):

- Alteração de nome do usuário  
- Ativação/desativação de notificações  
- Atualização automática de saldos  
- Configuração de cache ativo (24h)  

Todos os testes foram realizados com usuário autenticado e integração ao **Firebase Firestore**.

---

##  Resumo dos Testes

| Código | Funcionalidade                         | Descrição do Teste                                  | Resultado Esperado                                | Resultado Obtido | Responsável |
|---------|-----------------------------------------|----------------------------------------------------|--------------------------------------------------|------------------|--------------|
| **CT01** | Carregar configurações existentes      | Abrir tela e exibir dados salvos no Firestore      | Exibir corretamente nome e preferências          | ✅ Sucesso        | Gabriela |
| **CT02** | Alterar nome do usuário                | Modificar nome e salvar                            | Atualizar campo `nome` no Firestore              | ✅ Sucesso        | Gabriela |
| **CT03** | Ativar/Desativar notificações          | Alternar o botão de notificações                   | Atualizar campo `notificacoes`                   | ✅ Sucesso        | Gabriela |
| **CT04** | Atualização automática                 | Alternar a opção e salvar                          | Atualizar campo `atualizacaoAutomatica`          | ✅ Sucesso        | Gabriela |
| **CT05** | Cache ativo (24h)                      | Ativar e verificar no Firestore                    | Atualizar campo `cacheAtivo`                     | ✅ Sucesso        | Gabriela |
| **CT06** | Persistência no Firestore              | Conferir valores atualizados                       | Dados salvos corretamente                        | ✅ Sucesso        | Gabriela |

---

##  CT01 – Carregar Configurações Existentes

**Descrição:** A tela exibe corretamente as informações atuais do usuário.  
**Resultado:** Dados carregados com sucesso.

<p align="center">
  <img src="https://github.com/user-attachments/assets/2d2cc16b-240c-4d3a-be1c-ddf468e2766d" width="600px">
</p>

---

##  CT02 – Alterar Nome do Usuário

**Descrição:** O nome foi alterado e salvo corretamente no Firestore.  
**Resultado:** Campo `nome` atualizado com sucesso.

<p align="center">
  <img src="https://github.com/user-attachments/assets/8bd89e0d-ed77-4131-94c5-6c32a99d4b0e" width="600px">
</p>

<img width="1632" height="363" alt="Image" src="https://github.com/user-attachments/assets/1b16a1e3-e1f0-42f0-b90c-a9a6cd60f5e3" />
---

##  CT03 – Ativar/Desativar Notificações

**Descrição:** A alternância das notificações refletiu corretamente no Firestore.  
**Resultado:** Campo `notificacoes` atualizado com sucesso.

<p align="center">
  <img src="https://github.com/user-attachments/assets/617d27de-3a21-4b3c-9d7a-e9f956f5c50e" width="600px">
</p>

---

##  CT04 – Alterar Atualização Automática

**Descrição:** A opção de atualização automática foi desativada corretamente.  
**Resultado:** Campo `atualizacaoAutomatica = false` salvo no Firestore.

<img width="1550" height="397" alt="Image" src="https://github.com/user-attachments/assets/c07656a4-f152-4a86-89b7-2ef2a94e5c55" />
---

## CT05 – Ativar Cache Ativo (24h)

**Descrição:** A configuração de cache foi ativada corretamente e registrada no banco.  
**Resultado:** Campo `cacheAtivo = true` salvo no Firestore.

<p align="center">
  <img src="https://github.com/user-attachments/assets/93e18b1a-775a-44b4-ad9a-a4ac3582f2c7" width="600px">
</p>

---

## CT06 – Persistência de Dados no Firestore

**Descrição:** Confirmação dos dados atualizados no Firestore.  
**Resultado:** Registro salvo com sucesso na coleção `settings`.

<img width="1604" height="387" alt="Image" src="https://github.com/user-attachments/assets/55dd7076-0f80-4225-8fcb-5afdd3aac37a" />

---

## Conclusão

- Todos os testes da **Tela de Configurações** foram realizados com êxito.  
- As informações foram gravadas corretamente no **Firebase Firestore**, com sincronização em tempo real.  
- Não foram encontrados erros durante os testes.  

 **Data:** 26/10/2025  
 **Responsável:** *Gabriela*  
 **Resultado Geral:** 100% dos casos de teste aprovados
