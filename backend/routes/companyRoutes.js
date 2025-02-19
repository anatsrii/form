const express = require('express');
const { createCompany} = require('../controllers/companies/companiesController.js');
const { updateCompany } = require('../controllers/companies/updateCompanies.js');
const {deleteCompany} = require('../controllers/companies/deleteCompanies.js');
const { getAllCompanies, getCompany } = require('../controllers/companies/getCompany.js')

const router = express.Router();

router.post('/create', createCompany);
router.get('/all', getAllCompanies);
router.get('/:id', getCompany);
router.put('/update/:id', updateCompany);
router.delete('/delete/:id', deleteCompany);

module.exports = router;
