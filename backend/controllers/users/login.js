const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../../config/dbConnect');
// login user
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'กรุณากรอกอีเมลและรหัสผ่าน' });
    }

    const client = await db.connect();
    const result = await client.query('SELECT * FROM users WHERE email = $1', [email]);
    client.release(); 

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'ไม่พบผู้ใช้ในระบบ' });
    }

    const user = result.rows[0];

    if (user.status !== 'active') {
      return res.status(403).json({ message: 'บัญชีของคุณถูกปิดใช้งาน' });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ message: 'รหัสผ่านไม่ถูกต้อง' });
    }

    // Generate JWT Token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.SECRET,
      { expiresIn: '12h' }
    );

    return res.status(200).json({ 
      message: 'เข้าสู่ระบบสำเร็จ',
      token, 
      user: { id: user.id, email: user.email, role: user.role }
    });

  } catch (error) {
    console.error('เกิดข้อผิดพลาดขณะเข้าสู่ระบบ:', error);
    res.status(500).json({ message: "เกิดข้อผิดพลาด", error: error.message });
  }
};

module.exports = { login };
