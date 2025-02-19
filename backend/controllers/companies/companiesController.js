const db = require('../../config/dbConnect.js');

// Create Company
const createCompany =  async (req, res) => {
  const pool = await db.connect();
  const owner_id = req.user.id;
  const {  company_name, contact_name, contact_lastname, phone, email, house_no, village, village_no, soi, road, sub_district, district, province, postal_code, tax_id } = req.body;

  try {
    if (!company_name || !contact_name || !contact_lastname || !phone || !email || !house_no || !village || !village_no || !soi || !road || !sub_district || !district || !province || !postal_code || !tax_id) {
      return res.status(400).json({ message: 'ต้องระบุข้อมูลให้ครบ' });
    }
    const existingTaxId = await pool.query('SELECT * FROM companies WHERE tax_id = $1', [tax_id]);
    if (existingTaxId.rows.length > 0) {
      return res.status(400).json({ message: 'เลขประจำตัวผู้เสียภาษีนี้ถูกใช้ลงทะเบียนแล้ว' });
    }
    const result = await pool.query(
      `INSERT INTO companies (owner_id, company_name, contact_name, contact_lastname, phone, email, house_no, village, village_no, soi, road, sub_district, district, province, postal_code, tax_id) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16) 
       RETURNING id`,
      [owner_id, company_name, contact_name, contact_lastname, phone, email, house_no, village, village_no, soi, road, sub_district, district, province, postal_code, tax_id]
    );
    return res.status(201).json({ 
      message: 'ลงทะเบียนบริษัทสำเร็จ',
      companyId: result.rows[0].id
    });
  } catch (error) {
    console.error('Create company error:', error);
    res.status(500).json({ 
      message: 'ลงทะเบียนบริษัทไม่สำเร็จ', 
      error: error.message 
    }); 
  } finally {
    pool.release();
  }
};

module.exports = { createCompany};
