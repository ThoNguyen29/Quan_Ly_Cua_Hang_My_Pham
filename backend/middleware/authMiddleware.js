const jwt = require('jsonwebtoken');

// Middleware để xác thực token
const authMiddleware = (req, res, next) => {
  try {
    // Lấy token từ header
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Không tìm thấy token xác thực' });
    }

    // Xác thực token
    const decoded = jwt.verify(token, 'secretkey');
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token không hợp lệ hoặc đã hết hạn' });
  }
};

// Middleware để kiểm tra quyền Admin
const isAdmin = (req, res, next) => {
  if (req.user && (req.user.role === 'Admin' || req.user.role === 'ADMIN')) {
    next();
  } else {
    return res.status(403).json({ message: 'Bạn không có quyền truy cập tài nguyên này' });
  }
};

module.exports = { authMiddleware, isAdmin };
