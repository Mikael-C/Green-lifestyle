import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAYZVGvFnnob_PexhWD5lvjb3ThzAk0DSA",
  authDomain: "green-lifestyle-ceb3f.firebaseapp.com",
  projectId: "green-lifestyle-ceb3f",
  storageBucket: "green-lifestyle-ceb3f.firebasestorage.app",
  messagingSenderId: "887411579335",
  appId: "1:887411579335:web:1fe4c5ca350e6cec78e1e2",
  measurementId: "G-B6FRM8NR45"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Authentication and Firestore (Database)
export const auth = getAuth(app);
export const db = getFirestore(app);
