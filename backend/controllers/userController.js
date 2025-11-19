const { connectDB } = require('../config/db');
const jwt = require('jsonwebtoken');

// Đăng nhập người dùng
async function loginUser(req, res) {
  const { TAIKHOAN, MATKHAU } = req.body;
  let connection;

  if (!TAIKHOAN || !MATKHAU) {
    return res.status(400).json({ message: 'Vui lòng nhập tài khoản và mật khẩu' });
  }

  try {
    connection = await connectDB();
    const result = await connection.execute(
      `SELECT * FROM NHANVIEN WHERE TAIKHOAN = :TAIKHOAN AND MATKHAU = :MATKHAU`,
      [TAIKHOAN, MATKHAU]
    );
    
    await connection.close();

    if (!result.rows || result.rows.length === 0) {
      return res.status(401).json({ message: 'Tài khoản hoặc mật khẩu không đúng' });
    }

    // Lấy thông tin nhân viên từ kết quả truy vấn
    const userRow = result.rows[0];
    const user = {};
    result.metaData.forEach((meta, index) => {
      user[meta.name] = userRow[index];
    });

    // Tạo token
    const token = jwt.sign({ userId: user.MANV, role: user.VAITRO }, 'secretkey', { expiresIn: '1h' });
    
    res.json({ token, userInfo: { MANV: user.MANV, HOTEN: user.HOTEN, VAITRO: user.VAITRO } });

  } catch (err) {
    if (connection) {
      try {
        await connection.close();
      } catch (closeErr) {
        console.error('Error closing connection:', closeErr);
      }
    }
    console.error('Error logging in:', err);
    res.status(500).json({ message: 'Lỗi máy chủ khi đăng nhập', error: err.message });
  }
}

module.exports = { loginUser };
