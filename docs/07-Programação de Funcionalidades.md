#  Programação de Funcionalidades

## Requisitos Atendidos

####  Pedro Henrique Rodrigues Evangelista 
RF-002
O sistema deve permitir que o usuário escolha em qual conta deseja receber o saldo no momento da solicitação de saque.

RF-014	O sistema deve criar solicitação de saque para o cliente

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
- RF-014 ✅ Concluído
- Integração Firebase ✅ Concluído  

---

## Contribuições
| Membro | Função | Contribuição |
|---------|--------|--------------|
| Pedro | Front-end | Implementação da tela Saque e AlterarConta |
| Pedro | Back-end | CRUDS e configurações das telas de Saque e AlterarConta |


---
#### Lucas de Paula Silva

- RF-001 O sistema deve permitir o cadastro de novos usuários com validação de CPF e e-mail únicos.
- RF-015 O sistema deve permitir o login de usuários existentes usando CPF e senha, recuperando o e-mail associado.
- RF-016 O sistema deve permitir que o usuário solicite a recuperação de senha via e-mail, utilizando o CPF para identificar a conta.
- RF-017 O sistema deve autenticar o usuário e vincular seus dados (nome, CPF, e-mail) ao seu UID do Firebase Auth.

---

*Baseado nos seus arquivos, a coleção `clientes` no Firestore armazena os dados adicionais do usuário:*

| Campo | Tipo | Descrição |
| :--- | :--- | :--- |
| **uid** (ID do documento) | String | ID único do usuário (UID do Firebase Auth) |
| **nome** | String | Nome completo do usuário cadastrado |
| **cpf** | String | CPF do usuário (somente dígitos), usado para login e busca |
| **email** | String | E-mail do usuário (usado para autenticação Firebase) |
| **data_cadastro** | Timestamp | Data/hora em que o usuário foi criado |

---

## Código-fonte
Implementado em:
- `src/cadastro.tsx` (Tela de Cadastro)
- `src/index.tsx` (Tela de Login)
- `src/recuperar-senha.tsx` (Tela de Recuperação de Senha)

---

## CRUDs Implementados

### Coleção: `clientes` (Firestore) e Firebase Authentication

| Operação | Método | Descrição |
| :--- | :--- | :--- |
| **Create (Cadastro)** | `createUserWithEmailAndPassword()` + `setDoc()` | Cria um novo usuário no Firebase Auth e salva seus dados (nome, CPF, e-mail) na coleção `clientes` no Firestore, usando o UID do Auth como ID do documento. Inclui validação de CPF único no Firestore antes do cadastro. |
| **Read (Login)** | `query()` + `getDocs()` (Firestore) + `signInWithEmailAndPassword()` (Auth) | Busca o e-mail do usuário na coleção `clientes` pelo CPF fornecido. Em seguida, usa esse e-mail e a senha para autenticar o usuário no Firebase Auth. |
| **Update (Recuperar Senha)** | `query()` + `getDocs()` (Firestore) + `sendPasswordResetEmail()` (Auth) | Busca o e-mail do usuário na coleção `clientes` pelo CPF fornecido. Em seguida, envia um e-mail de redefinição de senha para o e-mail encontrado via Firebase Auth. |

---

## Autenticação
O projeto utiliza Firebase Authentication.
O campo `id_cliente` (referenciado como `uid` no Firestore para a coleção `clientes`) é vinculado ao UID do usuário autenticado, garantindo a gestão de cada usuário. As telas de login e cadastro interagem diretamente com os serviços de autenticação e banco de dados do Firebase.

---

## Padrões de Codificação
- Uso de React Hooks (`useState`) para gerenciamento de estado local.
- Firebase Modular SDK (`createUserWithEmailAndPassword`, `signInWithEmailAndPassword`, `sendPasswordResetEmail`, `addDoc`, `getDocs`, `query`, `where`, `limit`, `setDoc`).
- Tratamento de erros com `try/catch` e mensagens de `Alert.alert()` amigáveis ao usuário.
- Componentização e uso de `StyleSheet.create()` para estilização consistente.
- Responsividade via Expo e React Native.
- Validação robusta de senha com feedback visual em tempo real.
- Formatação de CPF com máscara.
- Uso de `ActivityIndicator` para feedback de carregamento durante operações assíncronas.
- Navegação entre telas usando `expo-router`.
- Armazenamento seguro de token e dados do usuário após login usando `AsyncStorage`.

---

## Firebase
javascript
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

Quadro de Gestão
Ferramenta: Trello ou GitHub Projects Status:

- RF-001 ✅ Concluído (Cadastro de usuários com validação de CPF)
- RF-015 ✅ Concluído (Login de usuários por CPF)
- RF-016 ✅ Concluído (Recuperação de senha por CPF)
- RF-017 ✅ Concluído (Autenticação e vínculo de dados do usuário)
  
| Membro | Função | Contribuição |
|---------|--------|--------------|
| Lucas | Front-end | Implementação da tela de login, cadastro e alterar senha |
| Lucas | Back-end | CRUDS e configurações das telas login, cadastro e alterar senha |


## Comentários
A tela foi integrada ao Firebase Firestore, garantindo sincronização em nuvem e persistência de preferências do usuário.

