#  Programação de Funcionalidades

## Requisitos Atendidos

RF-002
O sistema deve permitir que o usuário escolha em qual conta deseja receber o saldo no momento da solicitação de saque.


RF-011
O sistema deve disponibilizar módulo de gerenciamento de conta bancária para recebimento.



---

| Campo             | Tipo      | Descrição                                                |
| ----------------- | --------- | -------------------------------------------------------- |
| **id_cliente**    | String    | ID do usuário autenticado (UID do Firebase Auth)         |
| **banco**         | String    | Nome do banco (ex: Banco do Brasil, Caixa, Nubank, etc.) |
| **agencia**       | String    | Número da agência bancária                               |
| **numero_conta**  | String    | Número da conta bancária                                 |
| **tipo_conta**    | String    | Tipo da conta (“corrente” ou “poupanca”)                 |
| **data_cadastro** | Timestamp | Data/hora em que a conta foi criada ou atualizada        |


| Campo             | Tipo      | Descrição                                       |
| ----------------- | --------- | ----------------------------------------------- |
| **id_cliente**    | String    | ID do usuário autenticado                       |
| **valor**         | Number    | Valor atual do saldo FGTS disponível para saque |
| **atualizado_em** | Timestamp | Data/hora da última atualização do saldo        |


| Campo                | Tipo      | Descrição                                                     |
| -------------------- | --------- | ------------------------------------------------------------- |
| **id_cliente**       | String    | ID do usuário autenticado que fez a solicitação               |
| **id_conta**         | String    | ID do documento da conta bancária usada para o saque          |
| **valor**            | Number    | Valor solicitado para saque                                   |
| **data_solicitacao** | Timestamp | Data e hora em que a solicitação foi feita                    |
| **status**           | String    | Situação da solicitação (“PENDENTE”, “APROVADO”, “REJEITADO”) |



---

## Código-fonte
Implementado em:
 - src/Saque_AlterarBanco

---

## CRUDs Implementados

Coleção: contas_bancarias

| Operação | Método                  | Descrição                                |
| -------- | ----------------------- | ---------------------------------------- |
| Create   | `addDoc()`              | Cadastra uma nova conta bancária         |
| Read     | `getDocs()` + `query()` | Busca conta existente pelo ID do usuário |
| Update   | `updateDoc()`           | Atualiza dados bancários já existentes   |

Coleção: solicitacoes_saque

| Operação | Método      | Descrição                          |
| -------- | ----------- | ---------------------------------- |
| Create   | `addDoc()`  | Cria uma nova solicitação de saque |
| Read     | `getDocs()` | Lista saques anteriores (futuro)   |

Coleção: saldos_fgts

| Operação | Método      | Descrição                               |
| -------- | ----------- | --------------------------------------- |
| Read     | `getDocs()` | Consulta o saldo FGTS do usuário logado |



---

## Autenticação
O projeto utiliza Firebase Authentication.
O campo id_cliente em todas as coleções é vinculado ao UID do usuário autenticado, garantindo que cada usuário veja e manipule apenas seus próprios dados.

---

## Padrões de Codificação
- Uso de React Hooks (useState, useEffect)
- Firebase Modular SDK (addDoc, getDocs, updateDoc, query, etc.)
- Tratamento de erros com try/catch e mensagens amigáveis ao usuário
- Componentização e uso de StyleSheet.create() para estilização consistente
- Responsividade via Expo e React Native
- Mensagens centralizadas em prompts.ts para padronizar Alertas e Toasts

---

## FireBase 
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// chaves do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAlUStEYMljcmngnygtL2L4SV0L61Q9wKI",
  authDomain: "acertfgts.firebaseapp.com",
  projectId: "acertfgts",
  storageBucket: "acertfgts.firebasestorage.app",
  messagingSenderId: "754475243879",
  appId: "1:754475243879:web:52c09cd91d27b8c1e7b7c2",
  measurementId: "G-PY1X5FB0XZ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Exporte o Auth e o Firestore
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
---

## Quadro de Gestão
**Ferramenta:** Trello ou GitHub Projects  
**Status:**
- RF-002 ✅ Concluído  
- RF-011 ✅ Concluído  
- Integração Firebase ✅ Concluído  

---

## Contribuições
| Membro | Função | Contribuição |
|---------|--------|--------------|
| Pedro | Front-end | Implementação da tela Saque e AlterarConta |
| Pedro | Back-end | CRUDS e configurações das telas de Saque e AlterarConta |
| [Nome 3] | QA | Testes e documentação |

---

## Comentários
A tela foi integrada ao Firebase Firestore, garantindo sincronização em nuvem e persistência de preferências do usuário.

