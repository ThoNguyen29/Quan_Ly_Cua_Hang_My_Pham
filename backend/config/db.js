const oracledb = require('oracledb');

async function connectDB() {
  try {
    const connection = await oracledb.getConnection({
      user: 'sys',  // Tên người dùng SYS
      password: '12345',  // Mật khẩu của tài khoản SYS
      connectString: 'localhost:1521/ORCL21PDB1',  // Kết nối với service name
      privilege: oracledb.SYSDBA  // Quyền SYSDBA
    });

    console.log('Connected to Oracle Database!');
    return connection;
  } catch (err) {
    console.error('Error connecting to database: ', err);
    throw err;
  }
}

module.exports = connectDB;  // Export hàm connectDB
