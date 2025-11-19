const oracledb = require('oracledb');

async function connectDB() {
  try {
    const connection = await oracledb.getConnection({
      user: 'QLCH_MYPHAM',
      // Please replace 'YOUR_PASSWORD_HERE' with your actual password
      password: '111',
      connectString: 'localhost:1521/XEPDB1'
    });

    console.log('Connected to Oracle Database!');
    return connection;
  } catch (err) {
    console.error('Error connecting to database: ', err);
    throw err;
  }
}

module.exports = connectDB;  // Export hàm connectDB
