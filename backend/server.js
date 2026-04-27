// server.js
// Main entry point for the MBMS backend API

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables from .env file
dotenv.config();

const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

// Import routes
const productRoutes = require('./routes/productRoutes');
const billRoutes = require('./routes/billRoutes');
const authRoutes = require('./routes/authRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');

// ─── Connect to MongoDB ───────────────────────────────────────────────────────
connectDB();

// ─── Create Express App ───────────────────────────────────────────────────────
const app = express();

// ─── Middleware ───────────────────────────────────────────────────────────────

// CORS — allow ALL origins (file://, localhost:any-port, etc.) during development
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (curl, Postman) and ALL browser origins
      callback(null, true);
    },
    credentials: true,
  })
);

// Parse incoming JSON request bodies
app.use(express.json());

// Parse URL-encoded form data
app.use(express.urlencoded({ extended: true }));

// ─── Serve Frontend Static Files ──────────────────────────────────────────────
// Opens your HTML pages at https://medbill-9eni.onrender.com/Dashboard.html etc.
// This removes all CORS issues since frontend and API share the same origin.
app.use(express.static(path.join(__dirname, '..')));

// ─── API Routes ───────────────────────────────────────────────────────────────
app.use('/api/products', productRoutes);
app.use('/api/bills', billRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/dashboard', dashboardRoutes);

// ─── Health Check ─────────────────────────────────────────────────────────────
// Visit https://medbill-9eni.onrender.com/api/health to verify the server is running
app.get('/api/health', (req, res) => {
  res.status(200).json({ success: true, message: '🚀 MBMS API is running!', timestamp: new Date() });
});

// ─── 404 Handler (unknown routes) ────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found` });
});

// ─── Global Error Handler ─────────────────────────────────────────────────────
// Must be last — catches errors thrown in any route/controller
app.use(errorHandler);

// ─── Start Server ─────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\n🚀 MBMS Server running on http://localhost:${PORT}`);
  console.log(`\n🌐 Open your app at:`);
  console.log(`   👉 http://localhost:${PORT}/Login.HTML`);
  console.log(`   👉 http://localhost:${PORT}/Dashboard.html`);
  console.log(`\n📡 API Endpoints:`);
  console.log(`   Health:   http://localhost:${PORT}/api/health`);
  console.log(`   Products: http://localhost:${PORT}/api/products`);
  console.log(`   Bills:    http://localhost:${PORT}/api/bills`);
  console.log(`   Auth:     http://localhost:${PORT}/api/auth/login\n`);
});

module.exports = app;
