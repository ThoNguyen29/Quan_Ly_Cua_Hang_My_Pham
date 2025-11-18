const { connectDB } = require('../config/db');
const oracledb = require('oracledb');

// Lấy danh sách sản phẩm
async function getProducts(req, res) {
  let connection;
  
  try {
    connection = await connectDB();
    const result = await connection.execute(
      `SELECT * FROM products ORDER BY id`,
      [],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );
    
    await connection.close();
    res.json(result.rows || []);
  } catch (err) {
    if (connection) {
      try {
        await connection.close();
      } catch (closeErr) {
        console.error('Error closing connection:', closeErr);
      }
    }
    console.error('Error fetching products:', err);
    // Trả về mảng rỗng nếu chưa có bảng products
    res.json([]);
  }
}

module.exports = { getProducts };

