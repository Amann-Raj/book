const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/books', require('./routes/bookRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));

// Fallback values if env is missing
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/bookstore';

mongoose.connect(MONGO_URI)
  .then(() => {
    app.listen(PORT, () =>
      console.log(`✅ Server running on port ${PORT}`)
    );
  })
  .catch((err) => console.error('❌ MongoDB connection error:', err));
