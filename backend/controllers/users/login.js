const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../../config/dbConnect');
const cors = require('cors');
require('dotenv').config();
const env = process.env;

const app = express();
app.use(express.json());
app.use(cors({
  credentials: true,
  origin: env.FRONTEND_URL
}));

// login user
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    const user = rows[0];

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if user is active
    if (user.status !== 'active') {
      return res.status(403).json({ message: 'Account is not active' });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    // Remove password from response
    delete user.password;

    return res.status(200).json({ 
      message: 'Login successful',
      user: user
    });
  } catch (error) {
    console.error('Login failed:', error);
    res.status(500).json({ 
      message: "Login failed", 
      error: error.message 
    });
  }
};

module.exports = { login };