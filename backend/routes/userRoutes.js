const express = require('express');
require('bcrypt');
const { login } = require('../controllers/users/login');
const { getAllUsers } = require('../controllers/users/getAllUsers.js');
const { getUser } = require('../controllers/users/getUser.js');
const { updateUser, updatePassword } = require('../controllers/users/updateUser');
const { deleteUser } = require('../controllers/users/deleteUser');
const { registerUser } = require('../controllers/users/registerUser.js');



const router = express.Router();

// user routes
router.get('/all', getAllUsers);
router.post('/register', registerUser);
router.get('/:id', getUser);
router.post('/login', login);
router.put('/update/:id', updateUser);
router.put('/update-password/:id', updatePassword);
router.delete('/delete/:id', deleteUser);


module.exports = router;
