const express = require('express');
const cors = require('cors');
const db = require('../../config/dbConnect');
const bcrypt = require('bcrypt');
require('dotenv').config();
const env = process.env;

const app = express();
app.use(express.json());
app.use(cors({
  credentials: true,
  origin: env.FRONTEND_URL
}));

// Update User Information
const updateUser = app.put('/updateUser/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { email, first_name, last_name, sign_url, phone, role, status } = req.body;
    
    const [getUser] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
    if (!getUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    const updateData = {
      email: email || getUser.email,
      first_name: first_name || getUser.first_name,
      last_name: last_name || getUser.last_name,
      sign_url: sign_url || getUser.sign_url,
      phone: phone || getUser.phone,
      role: role || getUser.role,
      status: status || getUser.status
    };

    await db.query('UPDATE users SET ? WHERE id = ?', [updateData, id]);

    res.status(200).json({ 
      message: 'User information updated successfully',
      user: { id, ...updateData }
    });

  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({ message: 'Update user failed', error: error.message });
  }
});

// Update Password
const updatePassword = app.put('/updatePassword/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { oldPassword, newPassword } = req.body;

    // ตรวจสอบว่ามีผู้ใช้อยู่หรือไม่
    const [user] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // ตรวจสอบรหัสผ่านเก่า
    const isValidPassword = await bcrypt.compare(oldPassword, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid old password' });
    }

    // เข้ารหัสรหัสผ่านใหม่
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // อัพเดทรหัสผ่าน
    await db.query('UPDATE users SET password = ? WHERE id = ?', [hashedPassword, id]);

    res.status(200).json({ message: 'Password updated successfully' });

  } catch (error) {
    console.error('Update password error:', error);
    res.status(500).json({ message: 'Update password failed', error: error.message });
  }
});

module.exports = { updateUser, updatePassword };