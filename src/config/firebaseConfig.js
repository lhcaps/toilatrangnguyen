import { initializeApp } from "firebase/app";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getDatabase, connectDatabaseEmulator } from "firebase/database";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getStorage, connectStorageEmulator } from "firebase/storage";

// ✅ Cấu hình Firebase
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT",
  storageBucket: "YOUR_PROJECT.appspot.com",
  databaseURL:
    window.location.hostname === "localhost"
      ? "http://localhost:29006?ns=YOUR_PROJECT" // ✅ Port VIP DB
      : "https://YOUR_PROJECT.firebaseio.com",
};

// ✅ Khởi tạo Firebase App
const app = initializeApp(firebaseConfig);

// ✅ Khởi tạo các Service
const db = getFirestore(app);
const rtdb = getDatabase(app);
const auth = getAuth(app);
const storage = getStorage(app);

// ✅ Kết nối Emulator nếu chạy local
if (window.location.hostname === "localhost") {
  connectFirestoreEmulator(db, "localhost", 28086); // ✅ Port VIP Firestore
  connectDatabaseEmulator(rtdb, "localhost", 29006); // ✅ Port VIP DB
  connectAuthEmulator(auth, "http://localhost:9099");
  connectStorageEmulator(storage, "localhost", 9199);
}

export { app, db, rtdb, auth, storage };
