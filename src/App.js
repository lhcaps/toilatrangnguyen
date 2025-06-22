import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { requestFCMToken, onFCMMessage } from "./services/fcmService";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ExamPage from "./pages/ExamPage";

function App() {
  useEffect(() => {
    const setupFCM = async () => {
      const token = await requestFCMToken();
      console.log("🔑 FCM Token:", token);
      // 👉 Gửi token lên Firestore hoặc Functions nếu muốn
    };
    setupFCM();

    onFCMMessage((payload) => {
      alert(`🔔 ${payload.notification.title}: ${payload.notification.body}`);
    });
  }, []);

  return (
    <Router>
      <nav style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
        <Link to="/" style={{ marginRight: "10px" }}>🏠 Home</Link>
        <Link to="/login" style={{ marginRight: "10px" }}>🔑 Login</Link>
        <Link to="/register" style={{ marginRight: "10px" }}>📝 Register</Link>
        <Link to="/exam/demo">🧾 Exam</Link>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/exam/:examId" element={<ExamPage />} />
      </Routes>
    </Router>
  );
}

export default App;
