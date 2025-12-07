// Import the functions you need from Firebase SDK
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyA6Nam6QawcJGTYuo4nn_KfaQQieOlYe_8",
  authDomain: "cultureexplorer-e58ec.firebaseapp.com",
  projectId: "cultureexplorer-e58ec",
  storageBucket: "cultureexplorer-e58ec.firebasestorage.app",
  messagingSenderId: "537058504856",
  appId: "1:537058504856:web:039adeaba54e299e9c60ed",
  measurementId: "G-FGESYPT8C1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase services to use in your project
export const auth = getAuth(app);          // For authentication
export const db = getFirestore(app);       // For Firestore database
export const storage = getStorage(app);    // For Firebase Storage