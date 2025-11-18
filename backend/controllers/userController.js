const { connectDB } = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Đăng ký người dùng
async function registerUser(req, res) {
  const { username, password, email } = req.body;
  let connection;
  
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    connection = await connectDB();
    
    const result = await connection.execute(
      `INSERT INTO users (username, password, email) VALUES (:username, :password, :email)`,
      [username, hashedPassword, email],
      { autoCommit: true }
    );
    
    await connection.close();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    if (connection) {
      try {
        await connection.close();
      } catch (closeErr) {
        console.error('Error closing connection:', closeErr);
      }
    }
    console.error('Error registering user:', err);
    res.status(500).json({ message: 'Error registering user', error: err.message });
  }
}

// Đăng nhập người dùng
async function loginUser(req, res) {
  const { username, password } = req.body;
  let connection;

  try {
    connection = await connectDB();
    const result = await connection.execute(
      `SELECT * FROM users WHERE username = :username`,
      [username]
    );
    
    if (!result.rows || result.rows.length === 0) {
      await connection.close();
      return res.status(400).json({ message: 'User not found' });
    }

    // Oracle trả về dữ liệu dưới dạng mảng, cần map với metadata
    const userRow = result.rows[0];
    const user = {};
    result.metaData.forEach((meta, index) => {
      user[meta.name] = userRow[index];
    });

    const isMatch = await bcrypt.compare(password, user.PASSWORD || user.password);
    if (!isMatch) {
      await connection.close();
      return res.status(400).json({ message: 'Invalid password' });
    }

    const token = jwt.sign({ userId: user.USER_ID || user.USERID || user.ID }, 'secretkey', { expiresIn: '1h' });
    await connection.close();
    res.json({ token });
  } catch (err) {
    if (connection) {
      try {
        await connection.close();
      } catch (closeErr) {
        console.error('Error closing connection:', closeErr);
      }
    }
    console.error('Error logging in:', err);
    res.status(500).json({ message: 'Error logging in', error: err.message });
  }
}

module.exports = { registerUser, loginUser };
