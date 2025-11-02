import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyCUOCxo9IkY8N_9Ust13fg_rNI6cwUO6Hw",
  authDomain: "indicacoacert.firebaseapp.com",
  projectId: "indicacoacert",
  storageBucket: "indicacoacert.firebasestorage.app",
  messagingSenderId: "202887269571",
  appId: "1:202887269571:web:c1a18e2791b45f49ade676"
};


const app = initializeApp(firebaseConfig);


export const db = getFirestore(app);

export default app;