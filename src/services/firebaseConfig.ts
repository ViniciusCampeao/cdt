import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAsuIKmk4Xx_CjgtzhHxemiqcfAUyhnoqo",
  authDomain: "cdtpg-38cd9.firebaseapp.com",
  projectId: "cdtpg-38cd9",
  storageBucket: "cdtpg-38cd9.firebasestorage.app",
  messagingSenderId: "952828864334",
  appId: "1:952828864334:web:f202b4bada5c3f2e82e01f"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, app };
