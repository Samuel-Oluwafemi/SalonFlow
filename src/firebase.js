import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyByj-m5iLViN1iOhnL9uN6HguwlVfbkM-U",
  authDomain: "salonflow-bookify.firebaseapp.com",
  projectId: "salonflow-bookify",
  storageBucket: "salonflow-bookify.firebasestorage.app",
  messagingSenderId: "301352343617",
  appId: "1:301352343617:web:b3615d37429008828d8ec0"
};

const app = initializeApp(firebaseConfig);
// this line gives me access to the database
export const db = getFirestore(app);