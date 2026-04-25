// middleware/authMiddleware.js
// Verifies the JWT token sent in the Authorization header
// Use this on any route that requires a logged-in user

const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  // JWT is sent as: Authorization: Bearer <token>
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];

      // Verify the token — throws error if invalid or expired
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach user object to the request (without password)
      req.user = await User.findById(decoded.id).select('-password');

      next(); // move to the actual route handler
    } catch (error) {
      return res.status(401).json({ success: false, message: 'Not authorized — invalid token' });
    }
  }

  if (!token) {
    return res.status(401).json({ success: false, message: 'Not authorized — no token provided' });
  }
};

// Only allow admin users
const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ success: false, message: 'Access denied — admins only' });
  }
};

module.exports = { protect, adminOnly };
