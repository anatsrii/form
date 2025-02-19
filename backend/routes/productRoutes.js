const express = require('express');
const router = express.Router();
const { createProduct } = require('../controllers/products/createProducts');
const { getAllProducts, getProduct } = require('../controllers/products/getProducts');
const { deleteProduct } = require('../controllers/products/deleteProducts');

router.post('/create',  createProduct);
router.get('/all',  getAllProducts);
router.get('/:id', getProduct);
router.put('/delete/:id', deleteProduct);

module.exports = router;