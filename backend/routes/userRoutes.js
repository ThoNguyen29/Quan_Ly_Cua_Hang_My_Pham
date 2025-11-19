const express = require('express');
const router = express.Router();
const { loginUser } = require('../controllers/userController');

// Đăng nhập người dùng
router.post('/login', loginUser);

module.exports = router;
