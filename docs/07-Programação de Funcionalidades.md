# 🧩 Programação de Funcionalidades

## Pré-requisitos
- Especificação do Projeto
- Projeto de Interface
- Metodologia
- Arquitetura da Solução

---

## Requisitos Atendidos
- **RF-006:** Ativar/Desativar Notificações
- **RF-009:** Atualização de Saldos Agendada
- Alteração de dados pessoais (nome)
- Configuração de cache ativo (24h)

---

## Modelo Físico (Firestore)
**Coleção:** `settings`

| Campo | Tipo | Descrição |
|-------|------|------------|
| nome | String | Nome do usuário |
| notificacoes | Boolean | Ativa/desativa notificações |
| atualizacaoAutomatica | Boolean | Define atualização automática |
| cacheAtivo | Boolean | Define cache de 24h |
| updatedAt | String | Data/hora da última atualização |

---

## Código-fonte
Implementado em:
- `app/(tabs)/index.tsx`
- `src/firebase.js`

---

## CRUDs Implementados
| Operação | Método | Descrição |
|-----------|---------|------------|
| Read | getDoc() | Carrega as configurações do usuário |
| Update | setDoc() | Atualiza ou cria as configurações |

---

## Autenticação
O projeto usa Firebase. O ID do usuário será vinculado à autenticação do Firebase em versões futuras.

---

## Padrões de Codificação
- Hooks React (`useState`, `useEffect`)
- Firebase Modular SDK
- Tratamento de erros (`try/catch`)
- Componentização e uso de `StyleSheet.create`

---

## Evidências
- Código-fonte funcional.
- Integração com Firebase Firestore confirmada.
- Interface implementada conforme o projeto de interface.

---

## Quadro de Gestão
**Ferramenta:** Trello ou GitHub Projects  
**Status:**
- RF-006 ✅ Concluído  
- RF-009 ✅ Concluído  
- Integração Firebase ✅ Concluído  

---

## Contribuições
| Membro | Função | Contribuição |
|---------|--------|--------------|
| Gabriela | Front-end | Implementação da tela Configurações e Firebase |
| Gabriela | Back-end | Configuração do Firestore e regras |
| [Nome 3] | QA | Testes e documentação |

---

## Comentários
A tela foi integrada ao Firebase Firestore, garantindo sincronização em nuvem e persistência de preferências do usuário.
