// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";  // Import Firebase Authentication

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBiwkY7LIeWoU_HOhTLSWokIHf_zMamPM4",
  authDomain: "toilatrangnguyen-6792a.firebaseapp.com",
  projectId: "toilatrangnguyen-6792a",
  storageBucket: "toilatrangnguyen-6792a.firebasestorage.app",
  messagingSenderId: "677519661679",
  appId: "1:677519661679:web:280a159986510554e10b9a",
  measurementId: "G-5J0M1F9EVN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const db = getFirestore(app);  // Firestore
const auth = getAuth(app);     // Firebase Authentication

export { db, auth };
