


import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBkBreHU0cEip4sGwEo7G3j-Au6ymvHveY",
    authDomain: "login-logout-77c78.firebaseapp.com",
    projectId: "login-logout-77c78",
    storageBucket: "login-logout-77c78.firebasestorage.app",
    messagingSenderId: "902050360678",
    appId: "1:902050360678:web:86fcba3c9f8f24c279aca7"
  };

// ✅ Prevents reinitialization of Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
export const db = getFirestore(app);