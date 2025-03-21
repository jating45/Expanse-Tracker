import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDTJRaVpolRMHbIC6C8VcBvKQOxZrb64o8",  // 🔥 Replace with your actual API key from Firebase Console
  authDomain: "expence-tracker-b5bfb.firebaseapp.com",
  projectId: "expence-tracker-b5bfb",
  storageBucket: "expence-tracker-b5bfb.appspot.com",
  messagingSenderId: "950907159401",
  appId: "1:950907159401:web:efe0703dd09369d1e673f8",
  measurementId: "G-4Z67TP4YG7",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);


const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };

