const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware (nếu cần thêm)
app.use(express.json());

// Route test
app.get('/', (req, res) => {
  res.send('✅ Backend Node.js chạy OK! Tôi Là Trạng Nguyên 🚀');
});

// Route phụ
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Xin chào từ backend!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Backend server đang chạy tại http://localhost:${PORT}`);
});
