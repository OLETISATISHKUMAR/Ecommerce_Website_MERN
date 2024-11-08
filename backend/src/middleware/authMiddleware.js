const jwt = require('jsonwebtoken');
const User = require('../models/User.js');

const protect = async (req, res, next) => {
  let token;

  // Check if authorization header with Bearer token exists
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Extract the token from the header
      token = req.headers.authorization.split(' ')[1];
      
      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Fetch the user by ID and exclude the password field
      req.user = await User.findById(decoded.id).select('-password');

      // Check if user was found
      if (!req.user) {
        return res.status(401).json({ message: 'User not found, please log in again' });
      }

      // Move to the next middleware or route handler
      next();
    } catch (error) {
      console.error('Authorization error:', error);
      
      // Handle token-specific errors
      if (error.name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'Token expired, please log in again' });
      }
      
      // Default error response for token validation failure
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    // No token found in the request header
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = { protect };
