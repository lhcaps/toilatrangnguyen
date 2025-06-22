import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>🏠 Trang Chủ Tôi Là Trạng Nguyên</h1>
      <p>Chào mừng bạn đến hệ thống thi online!</p>
      <div style={{ marginTop: "20px" }}>
        <Link to="/login">
          <button style={{ marginRight: "10px" }}>🔑 Đăng Nhập</button>
        </Link>
        <Link to="/register">
          <button>📝 Đăng Ký</button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
