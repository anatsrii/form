const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('../../config/dbConnect.js');
const authMiddleware = require('../../middleware/authMiddleware.js');
require('dotenv').config();


const app = express();

app.use(cors({
  credentials: true,
  origin: process.env.FRONTEND_URL
}));

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


const getAll = app.get('/all', authMiddleware, async (req, res) => {
  const owner_id = req.user.id; 
  const pool = await db.connect();
  try {
    const customerData = await pool.query(`SELECT * FROM customers WHERE owner_id = $1 AND deleted_at IS NULL`, [owner_id]);
    if (customerData.rows.length === 0 ) {
      return res.status(404).json({message: `Customer not found`});
    }

    res.status(200).json({customers: customerData.rows});

  } catch (error) {
    console.error(`Query all customer error`, error);
    res.status(500).json({ message: `Query all customer failed`});
  } finally {
    pool.release();
  }
});


const getOne = app.get('/:id', authMiddleware, async (req, res) => {
  const id = req.params.id;
  console.log(id, req.user.id);
  const owner_id = req.user.id;
  const pool = await db.connect();

  try {
    const targetCustomer = await pool.query(`SELECT * FROM customers WHERE id = $1 AND owner_id = $2`, [id, owner_id]);
    if (targetCustomer.rows.length === 0 ) {
      return res.status(404).json({message: `Customer not found.`});
    }

    res.status(200).json({customer: targetCustomer.rows[0]});

  } catch (error) {
    console.error(`Query customer error`, error);
    res.status(500).json({message: `Query customer failed.`, error: error.message});

  } finally {
    pool.release();
  }
});

module.exports = { getAll, getOne}