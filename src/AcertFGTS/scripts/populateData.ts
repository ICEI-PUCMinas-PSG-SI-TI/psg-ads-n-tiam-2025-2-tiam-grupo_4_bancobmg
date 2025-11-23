// scripts/populateData.ts
import { addDoc, collection, getDocs, limit, query, where } from "firebase/firestore";
import { db } from "../firebaseConfig";

export const popularDadosExemplo = async (userId: string) => {
  try {
    // Verificar se já existe saldo para este usuário (para evitar duplicação)
    const saldoRef = collection(db, "saldos_fgts");
    const q = query(saldoRef, where("id_cliente", "==", userId), limit(1));
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      console.log("Saldo FGTS já existe para este usuário");
      return;
    }

    // Adicionar saldo FGTS
    await addDoc(collection(db, "saldos_fgts"), {
      id_cliente: userId,
      ano_ref: 2024,
      valor: 1500.00,
      data_atualizacao: new Date(),
      fonte: "BancoLotusAPI"
    });

    console.log("Dados de exemplo adicionados com sucesso!");
  } catch (error) {
    console.error("Erro ao popular dados:", error);
    throw error; // Propagar o erro para tratamento superior
  }
};