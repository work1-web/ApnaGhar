require('dotenv').config();
const express     = require('express');
const cors        = require('cors');
const helmet      = require('helmet');
const morgan      = require('morgan');
const rateLimit   = require('express-rate-limit');
const connectDB   = require('./config/db');

const app = express();

// Connect DB
connectDB();

// Security
app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
}));

// Rate limit
app.use('/api', rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 300,
  message: { success: false, message: 'Too many requests, slow down.' },
}));

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Logging
if (process.env.NODE_ENV !== 'production') app.use(morgan('dev'));

// Routes
app.use('/api/auth',       require('./routes/auth'));
app.use('/api/properties', require('./routes/properties'));

// Health check
app.get('/health', (req, res) => res.json({ status: 'ok', time: new Date() }));

// 404 handler
app.use('*', (req, res) => res.status(404).json({ success: false, message: 'Route not found' }));

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: process.env.NODE_ENV === 'production' ? 'Server error' : err.message,
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 ApnaGhar server running on port ${PORT}`));
