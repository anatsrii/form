const express = require('express');
const cors = require('cors');
const db = require('../../config/dbConnect');
const bcrypt = require('bcrypt');
require('dotenv').config();
const env = process.env;
const bodyParser = require('body-parser');  


const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
  credentials: true, // อนุญาตให้ส่ง Cookies/Headers Authentication ไปด้วย
  origin: env.FRONTEND_URL // กำหนดให้เฉพาะ frontend ที่มี URL ตรงตามนี้เท่านั้นที่สามารถเข้าถึง API นี้ได้
}))

// Register User
const registerUser = app.post('/register', async (req, res) => {
  const client = await db.connect();
  try {
    const { email, password, first_name, last_name, phone, role = 'user', status = 'active' } = req.body;
    
    // Check if user exists
    const existingUsers = await client.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );
    
    if (existingUsers.rows.length > 0) {
      return res.status(400).json({ message: 'User already registered' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const result = await client.query(
      `INSERT INTO users (email, password, first_name, last_name, phone, role, status) 
       VALUES ($1, $2, $3, $4, $5, $6, $7) 
       RETURNING id`,
      [email, hashedPassword, first_name, last_name, phone, role, status]
    );

    return res.status(201).json({ 
      message: 'User registered successfully',
      userId: result.rows[0].id
      
    }
  );
    
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({ 
      message: 'Registration failed', 
      error: error.message 
    }, console.log(res.json));
    
  } finally {
    client.release();
  } 
});

module.exports = { registerUser };