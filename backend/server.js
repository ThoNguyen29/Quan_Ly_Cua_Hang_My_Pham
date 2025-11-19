const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { connectDB } = require('./config/db');

const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(cors());
app.use(bodyParser.json());

connectDB().then(() => {
  console.log('Database connected');
}).catch((err) => {
  console.error('Failed to connect to database', err);
});

// API routes
app.use('/api/users', userRoutes);

app.listen(5000, () => {
  console.log('Server running on port 5000');
});