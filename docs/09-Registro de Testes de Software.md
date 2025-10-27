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
| **CT11** | Carregar configurações existentes      | Abrir tela e exibir dados salvos no Firestore      | Exibir corretamente nome e preferências          | ✅ Sucesso        | Gabriela |
| **CT12** | Alterar nome do usuário                | Modificar nome e salvar                            | Atualizar campo `nome` no Firestore              | ✅ Sucesso        | Gabriela |
| **CT13** | Ativar/Desativar notificações          | Alternar o botão de notificações                   | Atualizar campo `notificacoes`                   | ✅ Sucesso        | Gabriela |
| **CT14** | Atualização automática                 | Alternar a opção e salvar                          | Atualizar campo `atualizacaoAutomatica`          | ✅ Sucesso        | Gabriela |
| **CT15** | Cache ativo (24h)                      | Ativar e verificar no Firestore                    | Atualizar campo `cacheAtivo`                     | ✅ Sucesso        | Gabriela |
| **CT16** | Persistência no Firestore              | Conferir valores atualizados                       | Dados salvos corretamente                        | ✅ Sucesso        | Gabriela |

---

##  CT11 – Carregar Configurações Existentes

**Descrição:** A tela exibe corretamente as informações atuais do usuário.  
**Resultado:** Dados carregados com sucesso.

<p align="center">
  <img src="https://github.com/ICEI-PUCMinas-PSG-SI-TI/psg-ads-n-tiam-2025-2-tiam-grupo_4_bancobmg/blob/main/docs/img/Captura%20de%20tela%202025-10-26%20213334.png" width="600px">
</p>

---

##  CT12 – Alterar Nome do Usuário

**Descrição:** O nome foi alterado e salvo corretamente no Firestore.  
**Resultado:** Campo `nome` atualizado com sucesso.

<p align="center">
  <img src="https://github.com/ICEI-PUCMinas-PSG-SI-TI/psg-ads-n-tiam-2025-2-tiam-grupo_4_bancobmg/blob/main/docs/img/Captura%20de%20tela%202025-10-26%20213408.png" width="600px">
</p>

---

##  CT13 – Ativar/Desativar Notificações

**Descrição:** A alternância das notificações refletiu corretamente no Firestore.  
**Resultado:** Campo `notificacoes` atualizado com sucesso.

<p align="center">
  <img src="https://github.com/ICEI-PUCMinas-PSG-SI-TI/psg-ads-n-tiam-2025-2-tiam-grupo_4_bancobmg/blob/main/docs/img/WhatsApp%20Image%202025-10-26%20at%2021.49.55%20(2).jpeg" width="600px">
</p>

---

##  CT14 – Alterar Atualização Automática

**Descrição:** A opção de atualização automática foi desativada corretamente.  
**Resultado:** Campo `atualizacaoAutomatica = false` salvo no Firestore.

<p align="center">
  <img src="https://github.com/ICEI-PUCMinas-PSG-SI-TI/psg-ads-n-tiam-2025-2-tiam-grupo_4_bancobmg/blob/main/docs/img/WhatsApp%20Image%202025-10-26%20at%2021.49.55%20(3).jpeg" width="600px">
</p>

---

## CT15 – Ativar Cache Ativo (24h)

**Descrição:** A configuração de cache foi ativada corretamente e registrada no banco.  
**Resultado:** Campo `cacheAtivo = true` salvo no Firestore.

<p align="center">
  <img src="https://github.com/ICEI-PUCMinas-PSG-SI-TI/psg-ads-n-tiam-2025-2-tiam-grupo_4_bancobmg/blob/main/docs/img/WhatsApp%20Image%202025-10-26%20at%2021.49.55%20(4).jpeg" width="600px">
</p>

---

## CT16 – Persistência de Dados no Firestore

**Descrição:** Confirmação dos dados atualizados no Firestore.  
**Resultado:** Registro salvo com sucesso na coleção `settings`.

<p align="center">
  <img src="https://github.com/ICEI-PUCMinas-PSG-SI-TI/psg-ads-n-tiam-2025-2-tiam-grupo_4_bancobmg/blob/main/docs/img/WhatsApp%20Image%202025-10-26%20at%2021.49.55%20(5).jpeg" width="600px">
</p>

---

## Conclusão

- Todos os testes da **Tela de Configurações** foram realizados com êxito.  
- As informações foram gravadas corretamente no **Firebase Firestore**, com sincronização em tempo real.  
- Não foram encontrados erros durante os testes.  

 **Data:** 26/10/2025  
 **Responsável:** *Gabriela*  
 **Resultado Geral:** 100% dos casos de teste aprovados
