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
}));

// get user
const getUser = app.get('/:id', async (req, res) => {
  const pool = await db.connect();
  
  try {
    const { id } = req.params;
    const findUser = await pool.query('SELECT * FROM users WHERE id = $1' , [id]);
    const user = findUser.rows[0];
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ user: user });
  } catch (error) {
    console.error('Get user error: ', error);
    res.status(500).json({ message: 'Get user failed', error: error.message });
  } finally {
    pool.release();
  }
});



module.exports = { getUser };