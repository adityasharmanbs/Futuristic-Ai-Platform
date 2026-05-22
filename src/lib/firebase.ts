import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Use env vars when available; fall back to known defaults for local dev.
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "creatoros-5b573.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "creatoros-5b573",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "creatoros-5b573.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "317340869556",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:317340869556:web:5164273c6842ed7e9748e1",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-0SMTM5TMNQ",
};

// Initialize Firebase app once to avoid duplicate-app errors in HMR.
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
