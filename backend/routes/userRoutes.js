const express = require('express');
const { login } = require('../controllers/users/login');
const { getAllUsers } = require('../controllers/users/getAllUsers');
const { getUser } = require('../controllers/users/getUser');
const { updateUser, updatePassword } = require('../controllers/users/updateUser');
const { deleteUser } = require('../controllers/users/deleteUser');
const { registerUser } = require('../controllers/users/registerUser');
const authenticateToken = require('../middleware/authMiddleware'); // 🔹 เพิ่ม middleware

const router = express.Router();

// user routes
router.get('/all', authenticateToken, getAllUsers); // 🔹 ต้องใช้ token
router.post('/register', registerUser);
router.get('/:id', authenticateToken, getUser); // 🔹 ต้องใช้ token
router.post('/login', login);
router.put('/update/:id', authenticateToken, updateUser); // 🔹 ต้องใช้ token
router.put('/update-password/:id', authenticateToken, updatePassword); // 🔹 ต้องใช้ token
router.delete('/delete/:id', authenticateToken, deleteUser); // 🔹 ต้องใช้ token

module.exports = router;
