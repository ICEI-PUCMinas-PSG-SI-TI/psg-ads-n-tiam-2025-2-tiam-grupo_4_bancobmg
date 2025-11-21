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


export interface ContaBancaria {
  id?: string;
  id_cliente: string;
  banco: string;
  agencia: string;
  numero_conta: string;
  tipo_conta: "corrente" | "poupanca";
  data_cadastro: Date;
}

export interface SaldoFGTS {
  id?: string;
  id_cliente: string;
  ano_ref: number;
  valor: number;
  data_atualizacao: Date;
  fonte: string;
}

export interface SolicitacaoSaque {
  id?: string;
  id_cliente: string;
  id_conta: string;
  valor: number;
  data_solicitacao: Date;
  status: "PENDENTE" | "CONCLUIDO" | "ERRO";
}