const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  process.env.FRONTEND_URL, // Set this to your Vercel URL on Render
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.some(o => origin.startsWith(o))) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));
app.use(express.json());

// Routes
const simulationRoutes = require('./routes/simulationRoutes');
app.use('/api/simulation', simulationRoutes);

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
