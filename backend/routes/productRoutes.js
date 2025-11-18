const express = require('express');
const router = express.Router();
const { getProducts } = require('../controllers/productController');

// Lấy danh sách sản phẩm
router.get('/', getProducts);

module.exports = router;

