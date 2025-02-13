const express = require('express');
const bcrypt = require('bcrypt');
const dbConnect = require('../../config/dbConnect');
const cors = require('cors');
require('dotenv').config();
const bodyParser = require('body-parser');


const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
  credentials: true,
  origin: process.env.FRONTEND_URL
}))

// Create Document
const createDocument = app.post('/create', async (req, res) => {
  const db = await dbConnect.connect();
  const { doc_type, receipt_by, create_by_username, sub_total, discount_amount, vat_rate, vat_amount, grand_total, grand_total_text } = req.body;
  const {company_id, user_id} = req.params;

  try {
    const sqlCommand = `INSERT INTO public.documents (doc_type, receipt_by, create_by_username, sub_total, discount_amount, vat_rate, vat_amount, grand_total, grand_total_text, company_id, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING id`;
    const values = [doc_type, receipt_by, create_by_username, sub_total, discount_amount, vat_rate, vat_amount, grand_total, grand_total_text, company_id, user_id];
    await db.query(sqlCommand, values);
    res.status(201).json({message: 'Document created successfully'});

  } catch (error) {
    console.error('Create document error:', error);
    return res.status(500).json({message: 'Create document failed', error: error.message});
  }
})

module.exports = { createDocument };