import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage'; // Importação do Storage

const firebaseConfig = {
  apiKey: "AIzaSyAsuIKmk4Xx_CjgtzhHxemiqcfAUyhnoqo",
  authDomain: "cdtpg-38cd9.firebaseapp.com",
  projectId: "cdtpg-38cd9",
  storageBucket: "cdtpg-38cd9.firebasestorage.app", // Corrigido o valor do bucket
  messagingSenderId: "952828864334",
  appId: "1:952828864334:web:f202b4bada5c3f2e82e01f"
};

// Inicialize o app Firebase
const app = initializeApp(firebaseConfig);

// Inicialize os serviços do Firebase
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app); // Inicialize o Storage

// Exporte os serviços
export { auth, db, storage, app };
