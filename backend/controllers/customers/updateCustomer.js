const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authMiddleware = require('../../middleware/authMiddleware.js')
const db = require('../../config/dbConnect');
require('dotenv').config();


const app = express();
app.use(cors({
  credentials: true,
  origin: process.env.FRONTEND_URL
}));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const updateCustomer  = app.put('/update/:id', authMiddleware, async (req, res) => {
  const owner_id = req.user.id;
  const { id } = req.params;
  const { company_name, contact_name, contact_lastname, phone, email, house_no, village, village_no, soi, road, sub_district, district, province, postal_code, tax_id} = req.body;
  const pool = await db.connect();

  try {
    const existed = await pool.query('SELECT * FROM customers WHERE id = $1 AND owner_id = $2' , [id, owner_id]);
    if (existed.rows.length === 0) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    
    if (tax_id) {
      // id != $2 ใช้เพื่อไม่ให้เอา id ของตัวเองมาเทียบ
      const checkDuplicate = await pool.query(
        'SELECT id FROM customers WHERE tax_id = $1 AND id != $2',
        [tax_id, id]
      );
      console.log(`log check tax_id`,tax_id);
      if (checkDuplicate.rows.length > 0) {
        return res.status(400).json({ message: "Tax ID already exists" });
      }
    }

    const updateCustomerData = `
    UPDATE customers 
    SET company_name = COALESCE($1, company_name), 
        contact_name = COALESCE($2, contact_name), 
        contact_lastname = COALESCE($3, contact_lastname), 
        phone = COALESCE($4, phone), 
        email = COALESCE($5, email), 
        house_no = COALESCE($6, house_no), 
        village = COALESCE($7, village), 
        village_no = COALESCE($8, village_no), 
        soi = COALESCE($9, soi), 
        road = COALESCE($10, road), 
        sub_district = COALESCE($11, sub_district), 
        district = COALESCE($12, district), 
        province = COALESCE($13, province), 
        postal_code = COALESCE($14, postal_code), 
        tax_id = COALESCE($15, tax_id)
    WHERE id = $16 AND owner_id = $17
    RETURNING *;
  `;

  const updateData = await pool.query(updateCustomerData, [
    company_name || existed.company_name, contact_name || existed.contact_name, contact_lastname || existed.contact_lastname, phone || existed.phone, email || existed.email,
    house_no || existed.house_no, village || existed.village, village_no || existed.village_no, soi || existed.soi, road || existed.road, sub_district || existed.sub_district, district || existed.district, 
    province || existed.province, postal_code || existed.postal_code, tax_id || existed.tax_id, id, owner_id
  ]);

  res.status(200).json({message: 'Customer data updated successfully', customer: updateData.rows[0]})

  } catch (error) {
    console.error('Update customer error:', error);
    res.status(500).json({message: 'Update customer failed', error: error.message});

  } finally {
    pool.release();
  }


});


module.exports = { updateCustomer };