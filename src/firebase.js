import { getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAlUStEYMljcmngnygtL2L4SV0L61Q9wKI",
  authDomain: "acertfgts.firebaseapp.com",
  projectId: "acertfgts",
  storageBucket: "acertfgts.firebasestorage.app",
  messagingSenderId: "754475243879",
  appId: "1:754475243879:web:52c09cd91d27b8c1e7b7c2",
  measurementId: "G-PY1X5FB0XZ"
};

let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

const db = getFirestore(app);

export { db };

