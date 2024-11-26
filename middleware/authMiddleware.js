const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your_jwt_secret_key';

// Middleware to check if the user is authenticated
const verifyToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]; // "Bearer token"

  if (!token) {
    return res.status(401).json({ message: 'Access Denied, No token provided' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Attach decoded user info to request object
    next();
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: 'Invalid token' });
  }
};

module.exports = verifyToken;
