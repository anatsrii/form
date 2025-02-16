const express = require ('express');
const cors = require ('cors');
const db = require ('../../config/dbConnect');

require ('dotenv').config();
const env = process.env;

const app = express ();
app.use(express.json());
app.use(cors({
  credentials: true,
  origin: env.FRONTEND_URL
}));

// Delete User
const deleteUser = app.delete('/delete/:id', async (req, res) => { 
  const pool = await db.connect();
  try {
    const { id } = req.params;
    
    // Check if user exists
    const targetUser = await pool.query('SELECT * FROM users WHERE id = $1 ', [id]);
    
    if (targetUser.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Delete user
    await pool.query('DELETE FROM users WHERE id = $1', [id]);
    
    return res.status(200).json({ 
      message: `User ${targetUser.rows[0].email} deleted successfully`,
    });

  } catch (error) {
    console.error('Delete user error:', error);
    return res.status(500).json({ 
      message: 'Delete user failed', 
      error: error.message 
    });
  }finally {
    pool.release();
  }
});

module.exports = { deleteUser };