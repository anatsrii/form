const express = require('express');
const db = require('../../config/dbConnect');
const cors = require('cors');
require('dotenv').config();
const env = process.env;


const app = express();

app.use(express.json());
app.use(cors({
  credentials: true,
  origin: env.FRONTEND_URL
}))


const getAllUsers = app.get('/all', async (req, res) => {
  const pool = await db.connect();
  try {
    const allUser = await pool.query('SELECT * FROM users');
    res.status(200).json({users: allUser.rows});
  } catch (error) {
    console.error('Get all user error: ', error);
    res.status(500).json({ message: 'Get all user failed', error: error.message });
  }finally {
    pool.release();
  }     
});


module.exports = { getAllUsers };