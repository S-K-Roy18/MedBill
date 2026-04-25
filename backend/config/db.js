// config/db.js
// Connects to MongoDB using the MONGO_URI from your .env file

const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    // Exit process if DB connection fails — no point running without DB
    process.exit(1);
  }
};

module.exports = connectDB;
