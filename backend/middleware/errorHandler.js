// middleware/errorHandler.js
// Global error handler — catches any unhandled errors in routes

const errorHandler = (err, req, res, next) => {
  console.error('💥 Unhandled Error:', err.message);

  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';

  // Mongoose: bad ObjectId format (e.g. /api/products/badid)
  if (err.name === 'CastError') {
    statusCode = 400;
    message = `Invalid ID format: "${err.value}"`;
  }

  // Mongoose: duplicate key violation (e.g. duplicate SKU)
  if (err.code === 11000) {
    statusCode = 400;
    const field = Object.keys(err.keyValue)[0];
    message = `Duplicate value for field: "${field}"`;
  }

  // Mongoose validation errors (required fields missing, etc.)
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = Object.values(err.errors).map((e) => e.message).join(', ');
  }

  res.status(statusCode).json({ success: false, message });
};

module.exports = errorHandler;
