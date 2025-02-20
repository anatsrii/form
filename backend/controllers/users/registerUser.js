const db = require('../../config/dbConnect');
const bcrypt = require('bcrypt');

// Register User
const registerUser = async (req, res) => {
  const client = await db.connect();
  try {
    const { email, password, phone, role, status = 'active', last_login, first_name, last_name, sign_url } = req.body;
    console.log(email, password, phone, role, status, last_login, first_name, last_name, sign_url);

    if (!email || !password) {
      return res.status(400).json({ message: 'ต้องระบุอีเมลและรหัสผ่าน' });
    }

    // ตรวจสอบว่ามีผู้ใช้ในระบบหรือไม่
    const existingUsers = await client.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );

    if (existingUsers.rows.length > 0) {
      return res.status(400).json({ message: 'อีเมลนี้ถูกใช้ลงทะเบียนแล้ว' });
    }

    // แฮชรหัสผ่าน
    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 10);
    } catch (hashError) {
      console.error('เกิดข้อผิดพลาดในการเข้ารหัส:', hashError);
      return res.status(500).json({ message: 'เกิดข้อผิดพลาดในการเข้ารหัสรหัสผ่าน' });
    }

    // เพิ่มข้อมูลลงในฐานข้อมูล
    const result = await client.query(
      `INSERT INTO users (email, password, phone, role, status, last_login, first_name, last_name, sign_url) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) 
       RETURNING id`,
      [email, hashedPassword, phone, role, status, last_login, first_name, last_name, sign_url]
    );

    return res.status(201).json({ 
      message: 'ลงทะเบียนสำเร็จ',
      userId: result.rows[0].id
    });

  } catch (error) {
    console.error('ข้อผิดพลาดในการลงทะเบียน:', error);
    return res.status(500).json({ 
      message: 'ลงทะเบียนไม่สำเร็จ', 
      error: error.message 
    });
  } finally {
    client.release();
  }
};

module.exports = { registerUser };

