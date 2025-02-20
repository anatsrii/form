const db = require("../../config/dbConnect");
const bcrypt = require("bcrypt");

// Update User Information
const updateUser = async (req, res) => {
  const client = await db.connect();
  try {
    const { id } = req.params;
    const {
      email, phone, role, status, last_login, first_name, last_name, sign_url
    } = req.body;

    // ค้นหาผู้ใช้
    const findUser = await client.query("SELECT * FROM users WHERE id = $1", [
      id,
    ]);
    if (findUser.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    // อัปเดตข้อมูล (ไม่รวม password)
    const updatedUser = await client.query(
      `UPDATE users 
            SET email = COALESCE($1, email),
            phone = COALESCE($2, phone),
            role = COALESCE($3, role),
            status = COALESCE($4, status),
            last_login = COALESCE($5, last_login),
           first_name = COALESCE($6, first_name),
           last_name = COALESCE($7, last_name),
           sign_url = COALESCE($8, sign_url)
       WHERE id = $9
       RETURNING *`,
      [
        email, phone, role, status, last_login, first_name, last_name, sign_url,
        id,
      ]
    );

    res.status(200).json({
      message: "User information updated successfully",
      user: updatedUser.rows[0],
    });
  } catch (error) {
    console.error("Update user error:", error);
    res
      .status(500)
      .json({ message: "Update user failed", error: error.message });
  } finally {
    client.release();
  }
};

// Update Password// Update Password
const updatePassword = async (req, res) => {
  const client = await db.connect();
  try {
    const { id } = req.params;
    const { newPassword, oldPassword } = req.body;

    // ค้นหาผู้ใช้ในฐานข้อมูล
    const findUser = await client.query("SELECT * FROM users WHERE id = $1", [
      id,
    ]);
    if (findUser.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = findUser.rows[0];

    // ตรวจสอบรหัสผ่านเก่า
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Old password is incorrect" });
    }

    // ตรวจสอบว่ารหัสผ่านใหม่ไม่เหมือนรหัสผ่านเก่า
    const isSamePassword = await bcrypt.compare(newPassword, user.password);
    if (isSamePassword) {
      return res
        .status(400)
        .json({
          message: "New password must be different from the old password",
        });
    }

    // เข้ารหัส รหัสผ่านใหม่
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // อัปเดตรหัสผ่าน
    await client.query("UPDATE users SET password = $1 WHERE id = $2", [
      hashedPassword,
      id,
    ]);

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Update password error:", error);
    res
      .status(500)
      .json({ message: "Update password failed", error: error.message });
  } finally {
    client.release();
  }
};

module.exports = { updateUser, updatePassword };
