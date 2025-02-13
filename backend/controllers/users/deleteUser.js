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
  try {
    const { id } = req.params;
    
    // Check if user exists
    const [user] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Delete user
    await db.query('DELETE FROM users WHERE id = ?', [id]);
    
    return res.status(200).json({ 
      message: 'User deleted successfully',
      deletedUserId: id
    });

  } catch (error) {
    console.error('Delete user error:', error);
    return res.status(500).json({ 
      message: 'Delete user failed', 
      error: error.message 
    });
  }
});

module.exports = { deleteUser };