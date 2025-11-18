const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./db');  // Đảm bảo import đúng hàm connectDB

const app = express();
app.use(cors());
app.use(bodyParser.json());

connectDB().then(() => {
  console.log('Database connected');
}).catch((err) => {
  console.error('Failed to connect to database', err);
});

// API routes
app.listen(5000, () => {
  console.log('Server running on port 5000');
});
