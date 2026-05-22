import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "creatoros-5b573.firebaseapp.com",
  projectId: "creatoros-5b573",
  storageBucket: "creatoros-5b573.firebasestorage.app",
  messagingSenderId: "317340869556",
  appId: "1:317340869556:web:5164273c6842ed7e9748e1",
  measurementId: "G-0SMTM5TMNQ",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
