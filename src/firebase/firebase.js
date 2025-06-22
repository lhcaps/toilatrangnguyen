// Import SDK
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyBiwkY7LIeWoU_HOhTLSWokIHf_zMamPM4",
  authDomain: "toilatrangnguyen-6792a.firebaseapp.com",
  projectId: "toilatrangnguyen-6792a",
  storageBucket: "toilatrangnguyen-6792a.appspot.com", // ✅ FIX
  messagingSenderId: "677519661679",
  appId: "1:677519661679:web:280a159986510554e10b9a",
  measurementId: "G-5J0M1F9EVN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase services
const db = getFirestore(app);
const auth = getAuth(app);
const rtdb = getDatabase(app);
const storage = getStorage(app);

// Nếu chạy local Emulator
if (window.location.hostname === "localhost") {
  // connectAuthEmulator(auth, "http://localhost:9099");
  // connectFirestoreEmulator(db, "localhost", 8080);
  // connectDatabaseEmulator(rtdb, "localhost", 9000);
  // connectStorageEmulator(storage, "localhost", 9199);
}

export { db, auth, rtdb, storage };
