const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.log('❌ MongoDB connection error:', err));

// PIN authentication middleware
const PIN = '1234'; // Change this to your desired PIN

const authenticatePin = (req, res, next) => {
  const pin = req.headers['x-pin'];
  
  if (!pin) {
    return res.status(401).json({ error: 'PIN required' });
  }
  
  if (pin !== PIN) {
    return res.status(403).json({ error: 'Invalid PIN' });
  }
  
  next();
};

// Routes
app.use('/api/notes', authenticatePin, require('./routes/notes'));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
