const express = require('express');
const db = require('../../config/dbConnect.js');
const bodyParser = require('body-parser');
const cors = require('cors');
const authMiddleware = require('../../middleware/authMiddleware.js');

require('dotenv').config();

const app = express();
app.use(cors({
  credentials: true,
  origin: process.env.FRONTEND_URL
}));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const deleteCustomer = app.delete('/delete/:id', authMiddleware, async (req, res) => {
  const owner_id = req.user.id; // ใครเป็นคนลบ
  const { id } = req.params;
  const pool = await db.connect();

  try {
    // ตรวจสอบว่ามีลูกค้าหรือไม่ และเป็นของ user คนนี้หรือไม่
    const targetCustomer = await pool.query('SELECT * FROM customers WHERE id = $1 AND owner_id = $2', [id, owner_id]);
    
    if (targetCustomer.rows.length === 0) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    const now = new Date().toISOString(); // เวลาที่ลบ

    // แทนที่การ DELETE ด้วย UPDATE เพื่อทำ Soft Delete
    await pool.query(
      'UPDATE customers SET deleted_at = $1, deleted_by = $2 WHERE id = $3 AND owner_id = $4',
      [now, owner_id, id, owner_id]
    );

    res.status(200).json({ message: `Customer ${targetCustomer.rows[0].company_name} has been marked as deleted.` });

  } catch (error) {
    console.error('Delete customer error:', error);
    res.status(500).json({ message: 'Delete customer failed', error: error.message });

  } finally {
    pool.release();
  }
});

module.exports = { deleteCustomer };
