// src/services/firebase.js
import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Substitua pelos valores do seu Firebase (copie do console)
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
