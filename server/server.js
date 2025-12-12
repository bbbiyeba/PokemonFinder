const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware - ALLOW BOTH PORTS
app.use(cors({
  origin: [
    'http://localhost:3000', 
    'http://localhost:5173',
    'https://pokemonfinder.onrender.com'  // Add your frontend URL
  ],
  credentials: true
}));

app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/pokemonfinder')
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// Routes
const favoritesRouter = require('./routes/favorites');
app.use('/api/favorites', favoritesRouter);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running!' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});