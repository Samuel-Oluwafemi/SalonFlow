import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { Import } from "lucide-react";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Debug logging
console.log("🔥 Firebase Config:", {
  apiKey: firebaseConfig.apiKey ? "✅ Present" : "❌ Missing",
  authDomain: firebaseConfig.authDomain ? "✅ Present" : "❌ Missing",
  projectId: firebaseConfig.projectId ? "✅ Present" : "❌ Missing",
  storageBucket: firebaseConfig.storageBucket ? "✅ Present" : "❌ Missing",
  messagingSenderId: firebaseConfig.messagingSenderId ? "✅ Present" : "❌ Missing",
  appId: firebaseConfig.appId ? "✅ Present" : "❌ Missing",
});

const app = initializeApp(firebaseConfig);
// this line gives me access to the database
export const db = getFirestore(app);
