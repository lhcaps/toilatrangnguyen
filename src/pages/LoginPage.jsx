import React, { useState } from "react";
import { login } from "../services/authService";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      alert("🎉 Đăng nhập thành công!");
    } catch (err) {
      alert("❌ Lỗi đăng nhập: " + err.message);
    }
  };

  return (
    <div>
      <h1>🔑 Đăng nhập</h1>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        /><br />
        <input
          type="password"
          placeholder="Mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br />
        <button type="submit">Đăng nhập</button>
      </form>
    </div>
  );
};

export default LoginPage;
