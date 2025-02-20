const db = require ('../../config/dbConnect');

// Delete User
const deleteUser = async (req, res) => { 
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
};

module.exports = { deleteUser };