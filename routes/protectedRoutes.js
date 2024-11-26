const express = require('express');
const verifyToken = require('../middleware/authMiddleware'); // Import the JWT verification middleware

const router = express.Router();

// Protected route example
router.get('/protected', verifyToken, (req, res) => {
  res.status(200).json({
    message: 'Protected route accessed',
    user: req.user // Decoded user information from JWT
  });
});

module.exports = router;
