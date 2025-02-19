const db = require('../../config/dbConnect.js');

// Create Product
const createProduct = async (req, res) => {
  const pool = await db.connect();
  const userId = req.user.id;
  const targetCompanyId = await pool.query('SELECT id FROM companies WHERE owner_id = $1', [userId]);
  const companyId = targetCompanyId.rows[0].id;
  console.log(companyId);
  const {product_code, product_name, product_detail, unit_price } = req.body;
  
  try {
    if (!product_code || !product_name || !product_detail || !unit_price) {
      return res.status(400).json({ message: 'ต้องระบุข้อมูลให้ครบ' });
    }
    const checkDuplicate = await pool.query('SELECT * FROM products WHERE product_code = $1 AND company_id = $2', [product_code, companyId]);
    if (checkDuplicate.rows.length > 0) {
      return res.status(400).json({ message: 'รหัสสินค้านี้ถูกเพิ่มเข้ามาในระบบแล้ว' });
    }
    const result = await pool.query(
      `INSERT INTO products (company_id, product_code, product_name, product_detail, unit_price) 
       VALUES ($1, $2, $3, $4, $5) 
       RETURNING *`,
      [companyId, product_code, product_name, product_detail, unit_price]
    );
    return res.status(201).json({ 
      message: 'ลงทะเบียนสินค้าสำเร็จ',
      productId: result.rows[0]
    });
  } catch (error) {
    console.error('Create product error:', error);
    res.status(500).json({ 
      message: 'ลงทะเบียนสินค้าไม่สำเร็จ', 
      error: error.message 
    }); 
  } finally {
    pool.release();
  }
}

module.exports = { createProduct };