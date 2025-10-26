## Pré-requisitos
- Especificação do Projeto  
- Projeto de Interface  
- Metodologia  
- Arquitetura da Solução  

---

## Requisitos Atendidos
- **RF-010:** Sistema de Indicação de Usuários  
- **RF-013:** Contabilizar indicações de usuários  

---

## Modelo Físico (Firestore)
**Coleção:** `indicacoes`

| Campo | Tipo | Descrição |
|--------|------|------------|
| userId | String | ID do usuário autenticado |
| link | String | Link de indicação gerado para o usuário |
| contador | Number | Quantidade de vezes que o link foi copiado ou usado |
| createdAt | String | Data/hora da criação do link |
| updatedAt | String | Data/hora da última atualização |

---

## Código-fonte
Implementado em:
- `app/screens/IndicationScreen.tsx`
- `services/firebaseService.js`
- `config/firebaseConfig.js`

---

## CRUDs Implementados
| Operação | Método | Descrição |
|-----------|---------|------------|
| Create | addDoc() | Registra nova indicação no Firestore |
| Read | getDocs() | Lê dados das indicações registradas |
| Update | updateDoc() | Atualiza contador de indicações |
| Delete | deleteDoc() | Remove registros antigos (quando necessário) |

---

## Autenticação
A autenticação utiliza **Firebase Authentication**, garantindo que cada indicação seja vinculada ao usuário autenticado no app.

---

## Padrões de Codificação
- Hooks React (`useState`, `useEffect`)  
- Firebase Modular SDK  
- Tratamento de erros (`try/catch`)  
- Componentização e uso de `StyleSheet.create`  
- Interface responsiva e compatível com **Expo Go**

---

## Evidências
- Tela de indicação funcional com botão **“Copiar link”**  
- Integração confirmada com **Firebase Firestore**  
- Contagem de indicações atualizada corretamente  
- Interface validada no **Expo Go** e em ambiente de testes  

---

## Quadro de Gestão
**Ferramenta:** GitHub Projects  

**Status:**
- RF-010 ✅ Concluído  
- RF-011 ✅ Concluído  
- RF-012 ✅ Concluído  
- RF-013 ✅ Concluído  
- Integração Firebase ✅ Concluído  

---

## Contribuições
| Membro | Função | Contribuição |
|---------|--------|--------------|
| **Mariana** | Front-end | Implementação da tela de Indicação, layout e integração com Firebase |
| **Robson** | QA | Testes e documentação da funcionalidade |
| **Demais membros** | Apoio | Suporte e revisão do código |

---

## Comentários
A tela de indicação foi integrada com o **Firebase Firestore**, permitindo registrar e contabilizar indicações de forma automática.  
O design segue o padrão visual do app e garante usabilidade simples, com botão de cópia de link e redirecionamento direto para o site da Acert.



