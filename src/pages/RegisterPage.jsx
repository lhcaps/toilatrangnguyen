import React, { useState } from "react";
import { register } from "../services/authService";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await register(email, password);
      alert("🎉 Đăng ký thành công!");
    } catch (err) {
      alert("❌ Lỗi đăng ký: " + err.message);
    }
  };

  return (
    <div>
      <h1>📝 Đăng ký tài khoản</h1>
      <form onSubmit={handleRegister}>
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
        <button type="submit">Đăng ký</button>
      </form>
    </div>
  );
};

export default RegisterPage;
