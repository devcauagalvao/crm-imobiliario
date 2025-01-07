import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';  // Importando a função getAuth para autenticação
import { getFirestore } from 'firebase/firestore'; // Importando o Firestore
import { getStorage } from "firebase/storage"; // Importando o Firebase Storage

// Sua configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBfL3gIyitXSM5MUoibvDFyli4bAVPQaPI",
  authDomain: "crmimb.firebaseapp.com",
  projectId: "crmimb",
  storageBucket: "crmimb.appspot.com", // Corrigido
  messagingSenderId: "846339555551",
  appId: "1:846339555551:web:c84f5f9da9003ec8d9296a"
};

// Inicializar o Firebase
const app = initializeApp(firebaseConfig);

// Inicializar a autenticação
const auth = getAuth(app); // Instância de autenticação

const storage = getStorage(app);

// Exportando as instâncias


// Inicializar o Firestore
const db = getFirestore(app); // Garantir que você esteja utilizando o Firestore aqui

export { auth, db, storage }; // Exportando tanto auth quanto db






