const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const simulationRoutes = require('./routes/simulationRoutes');
app.use('/api/simulation', simulationRoutes);

``
// Basic Route
app.get('/', (req, res) => {
  res.send('Network Packet Simulator API is running');
});

// Database connection
// const connectDB = require('./config/db');
// connectDB();


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
