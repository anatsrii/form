const db = require('../../config/dbConnect');

// get user by JWT token
const getUser = async (req, res) => {
  const client = await db.connect();
  
  try {
    const userId = req.user.id; // 🔹 ดึงจาก token

    const findUser = await client.query('SELECT id, email, role FROM users WHERE id = $1' , [userId]);
    client.release();

    if (findUser.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ user: findUser.rows[0] });
  } catch (error) {
    res.status(500).json({ message: 'Get user failed', error: error.message });
  }
};

module.exports = { getUser };
