const db = require('../../config/dbConnect');


const getAllUsers = async (req, res) => {
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
};

module.exports = { getAllUsers };