const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Secret key for signing JWTs (in real apps, store this in .env)
const JWT_SECRET = 'your_jwt_secret_key';

router.post('/login', (req, res) => {
  const { uname, password } = req.body;

  // Simple validation
  if (uname === 'admin' && password === 'admin@123') {
    // Create payload
    const payload = {
      user: uname,
      role: 'admin'
    };

    // Sign the token
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

    // Return token
    res.status(201).json({ message: 'Login successfully', token });
  } else {
    res.status(401).json({ message: 'Invalid username or password' });
  }
});

module.exports = router;
