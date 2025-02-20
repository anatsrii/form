const express = require('express');
const { createDocument} = require('../controllers/documents/createDocument.js');
const { updateDocument } = require('../controllers/documents/updateDocument.js');
const { deleteDocument } = require('../controllers/documents/deleteDocument.js');
const { getAlldocument, getDocument } = require('../controllers/documents/getDocument.js');

const router = express.Router();

router.post('/create', createDocument);
router.put('/update/:id', updateDocument);
router.put('/delete/:id', deleteDocument);
router.get('/all', getAlldocument);
router.get('/:id', getDocument);



module.exports = router;