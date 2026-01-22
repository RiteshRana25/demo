// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCi2iGbHURu8JH_uSSZpdHiiO93BmEmLLo",
  authDomain: "icurein-47277.firebaseapp.com",
  projectId: "icurein-47277",
  storageBucket: "icurein-47277.firebasestorage.app",
  messagingSenderId: "309754663149",
  appId: "1:309754663149:web:9b7d06545090f87c66bce4",
  measurementId: "G-8WF4B2WL9H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);