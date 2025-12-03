# Programação de Funcionalidades

## Requisitos Atendidos

### **Pedro Henrique Rodrigues Evangelista**

---

### **RF-002**

O sistema deve permitir que o usuário escolha em qual conta deseja receber o saldo no momento da solicitação de saque.

### **RF-014**

O sistema deve criar solicitação de saque para o cliente.

### **RF-013**

O sistema deve permitir que o usuário abra chamados de suporte e visualize respostas enviadas pelo administrador, bem como possibilitar ao administrador responder chamados e atualizar seu status.

---

## Modelagem das Coleções

### **Coleção: contas_bancarias**

| Campo             | Tipo      | Descrição                                          |
| ----------------- | --------- | -------------------------------------------------- |
| **id_cliente**    | String    | ID do usuário autenticado (UID do Firebase Auth)   |
| **banco**         | String    | Nome do banco (ex: Banco do Brasil, Caixa, Nubank) |
| **agencia**       | String    | Número da agência bancária                         |
| **numero_conta**  | String    | Número da conta bancária                           |
| **tipo_conta**    | String    | Tipo da conta (“corrente” ou “poupanca”)           |
| **data_cadastro** | Timestamp | Data/hora em que a conta foi criada ou atualizada  |

---

### **Coleção: saldos_fgts**

| Campo             | Tipo      | Descrição                                       |
| ----------------- | --------- | ----------------------------------------------- |
| **id_cliente**    | String    | ID do usuário autenticado                       |
| **valor**         | Number    | Valor atual do saldo FGTS disponível para saque |
| **atualizado_em** | Timestamp | Data/hora da última atualização do saldo        |

---

### **Coleção: solicitacoes_saque**

| Campo                | Tipo      | Descrição                                                     |
| -------------------- | --------- | ------------------------------------------------------------- |
| **id_cliente**       | String    | ID do usuário autenticado que fez a solicitação               |
| **id_conta**         | String    | ID do documento da conta bancária usada para o saque          |
| **valor**            | Number    | Valor solicitado para saque                                   |
| **data_solicitacao** | Timestamp | Data e hora em que a solicitação foi feita                    |
| **status**           | String    | Situação da solicitação (“PENDENTE”, “APROVADO”, “REJEITADO”) |

---

### **Coleção: chamados** *(RF-013)*

| Campo             | Tipo      | Descrição                          |
| ----------------- | --------- | ---------------------------------- |
| **id_usuario**    | String    | UID do usuário que abriu o chamado |
| **email_usuario** | String    | Email do usuário                   |
| **assunto**       | String    | Título do chamado                  |
| **descricao**     | String    | Detalhamento do problema           |
| **status**        | String    | ABERTO, RESPONDIDO ou FECHADO      |
| **data_abertura** | Timestamp | Data e hora de abertura do chamado |

---

### **Coleção: respostas_chamados** *(RF-013)*

| Campo          | Tipo      | Descrição                                   |
| -------------- | --------- | ------------------------------------------- |
| **id_chamado** | String    | ID do chamado respondido pelo administrador |
| **resposta**   | String    | Texto da resposta                           |
| **data**       | Timestamp | Data em que a resposta foi enviada          |

---

## Código-fonte

Implementado em:

* `src/Saque_AlterarBanco`
* `src/Chamados` *(RF-013)*

---

## CRUDs Implementados

### Coleção: contas_bancarias

| Operação | Método                  | Descrição                                |
| -------- | ----------------------- | ---------------------------------------- |
| Create   | `addDoc()`              | Cadastra uma nova conta bancária         |
| Read     | `getDocs()` + `query()` | Busca conta existente pelo ID do usuário |
| Update   | `updateDoc()`           | Atualiza dados bancários já existentes   |

---

### Coleção: solicitacoes_saque

| Operação | Método      | Descrição                          |
| -------- | ----------- | ---------------------------------- |
| Create   | `addDoc()`  | Cria uma nova solicitação de saque |
| Read     | `getDocs()` | Lista saques anteriores (futuro)   |

---

### Coleção: saldos_fgts

| Operação | Método      | Descrição                               |
| -------- | ----------- | --------------------------------------- |
| Read     | `getDocs()` | Consulta o saldo FGTS do usuário logado |

---

### Coleção: chamados *(RF-013)*

| Operação | Método        | Descrição                               |
| -------- | ------------- | --------------------------------------- |
| Create   | `addDoc()`    | Criação de chamado (usuário)            |
| Read     | `query()`     | Listagem filtrada por usuário ou ADM    |
| Update   | `updateDoc()` | Atualiza status para RESPONDIDO/FECHADO |

---

### Coleção: respostas_chamados *(RF-013)*

| Operação | Método     | Descrição                       |
| -------- | ---------- | ------------------------------- |
| Create   | `addDoc()` | Salva resposta enviada pelo ADM |
| Read     | `query()`  | Lista respostas por chamado     |

---

## Autenticação

O projeto utiliza Firebase Authentication.
O campo **id_cliente / id_usuario** é vinculado ao UID do usuário, garantindo segurança e controle individual de dados.

---

## Padrões de Codificação

* Uso de React Hooks
* Firebase Modular SDK
* Tratamento de erros com try/catch
* StyleSheet para estilização
* Componentização
* Responsividade em Expo/React Native

---

## FireBase

*(mesmo exemplo que você enviou)*

---

## Quadro de Gestão

**Ferramenta:** Trello ou GitHub Projects

| Requisito           | Status      |
| ------------------- | ----------- |
| RF-002              | ✅ Concluído |
| RF-014              | ✅ Concluído |
| **RF-013**          | ✅ Concluído |
| Integração Firebase | ✅ Concluído |

---

## Contribuições

| Membro | Função    | Contribuição                                            |
| ------ | --------- | ------------------------------------------------------- |
| Pedro  | Front-end | Implementação das telas Saque, Alterar Conta e Chamados |
| Pedro  | Back-end  | CRUDs e integrações vinculadas aos RFs 002, 014 e 013   |





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
| Robson | Front-end | tela de login |
| Lucas | Front-end | cadastro e alterar senha |
| Lucas | Back-end | CRUDS e configurações das telas login, cadastro e alterar senha |

## Comentários
A tela foi integrada ao Firebase Firestore, garantindo sincronização em nuvem e persistência de preferências do usuário.

---
#### Nitai Nandi

- RF-007 O sistema deve gerar relatórios diários com a quantidade de clientes que utilizam o app, clientes que possuem saldo, clientes que sacaram e não sacaram, clientes não autorizados e total de saldo gerado no dia. Permitindo exportação para BI ou planilha.
- RF-018 O sistema deve permitir que um administrador faça login utilizando o CPF como identificador.
- RF-019 O sistema deve permitir que um administrador visualize todos os relatórios gerados, podendo buscar por data.

---

*A coleção `relatórios` no Firestore armazena os dados dos relatórios de uso gerados no dia:*
* Acesso ao colocar o CPF "99999999999" e senha "99999999999" na página de log-in

| Campo | Tipo | Descrição |
| :--- | :--- | :--- |
| **uid** (ID do documento) | String | ID único do relatório |
| **data** | Timestamp | Data onde o relatório foi gerado |
| **qtde_cliente_com_saldo** | Number | A quantidade de clientes com saldo no dia de geração |
| **qtde_clientes** | Number | A quantidade total de clientes registrados no sistema |
| **qtde_clientes_nao_autorizados** | Number | A quantidade de clientes que não foram autorizados a finalizar o saque de seu saldo |
| **qtde_clientes_sacaram** | Number | A quantidade de clientes que realizaram saque no dia de geração |
| **saldo_gerado** | Number | A quantidade total de saldo FGTS gerado no dia |


---

## Código-fonte
Implementado em:
- `src/AcertFGTS/app/ADM/home_ADM.tsx` (Tela de Relatórios)

---

Quadro de Gestão

- RF-007 ✅ Concluído
- RF-018 ✅ Concluído
- RF-019 ✅ Concluído
  
| Membro | Função | Contribuição |
|---------|--------|--------------|
| Nitai | Front-end | Tela de Relatórios |
| Nitai | Back-end | Tela de Relatórios |

## Comentários
A tela foi integrada ao Firebase Firestore, garantindo sincronização em nuvem e persistência de preferências do usuário.



---
#### **Mariana Martins**
- **RF-011:** O sistema deve permitir ao usuário copiar um código de indicação exclusivo.  
- **RF-012:** O sistema deve contabilizar o número de downloads e bonificação realizados por meio do código de indicação.  

---

### **Coleção no Firestore**

A coleção `indicacoes` armazena os códigos de indicação gerados pelos usuários e o número de downloads realizados por cada código.  
Isso garante rastreamento automático e atualização em tempo real das bonificações.

| **Campo** | **Tipo** | **Descrição** |
| :--- | :--- | :--- |
| **usuario** | String | Nome ou ID do usuário que gerou o código |
| **codigo** | String | Código de indicação gerado automaticamente |
| **downloads** | Number | Quantidade de downloads feitos com o código |
| **bonificacao** | Number | Valor total da bonificação acumulada |
| **createdAt** | String | Data e hora em que o código foi criado |

---

## **Código-fonte**

Implementado em:  
- `app/(tabs)/indicacao.tsx` → Tela de Indicação  
- `src/firebase.js` → Configuração do Firebase  

---

## **Comentários**

A tela foi integrada ao **Firebase Firestore**, permitindo gerar códigos, contabilizar downloads e calcular automaticamente as bonificações.  
A **sincronização em nuvem** garante que os dados de indicação fiquem atualizados entre todos os dispositivos.

---
#### Gabriela Cristina

- **RF-006:** O sistema deve permitir ao usuário ativar ou desativar notificações.  
- **RF-009:** O sistema deve permitir a atualização automática de saldos de forma agendada.  

---

### Coleção no Firestore

A coleção `settings` armazena as configurações individuais de cada usuário, permitindo **persistência em nuvem** e **sincronização automática** entre dispositivos.

| Campo | Tipo | Descrição |
| :--- | :--- | :--- |
| **nome** | String | Nome do usuário configurado no app |
| **notificacoes** | Boolean | Indica se o usuário deseja receber notificações |
| **atualizacaoAutomatica** | Boolean | Define se o saldo será atualizado automaticamente |
| **cacheAtivo** | Boolean | Ativa o cache local por 24 horas |
| **updatedAt** | String | Data e hora da última atualização das configurações |

---

## Código-fonte

Implementado em:
- `app/(tabs)/index.tsx` → Tela de Configurações  
- `src/firebase.js` → Configuração do Firebase  

---
## Comentários
A tela foi integrada ao Firebase Firestore, garantindo sincronização em nuvem e persistência de preferências do usuário.Mas ainda não conectei ao Firabase do grupo.

### Arquivo: `src/firebase.js`

```javascript
import { getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCQUqoF9hvzRZh8BQlHyziAN_OZneKxGyg",
  authDomain: "backbmg.firebaseapp.com",
  projectId: "backbmg",
  storageBucket: "backbmg.firebasestorage.app",
  messagingSenderId: "181160227579",
  appId: "1:181160227579:web:cf2ef9db7f1a4236daf65e",
  measurementId: "G-11RV1Z5L4F"
};

// Inicializa apenas uma vez
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

const db = getFirestore(app);

export { db };



