const express = require('express');
const { createCustomer } = require('../controllers/customers/createCustomer.js');
const { getAll, getOne } = require('../controllers/customers/getOneCustomer.js');
const { updateCustomer } = require('../controllers/customers/updateCustomer.js');
const { deleteCustomer } = require('../controllers/customers/deleteCustomer.js');





const router = express.Router();


router.post('/create',  createCustomer);
router.put('/update/:id',  updateCustomer);
router.get('/all',  getAll);
router.get('/:id',  getOne);
router.delete('/delete/:id',  deleteCustomer);


module.exports = router;