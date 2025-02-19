const db = require('../../config/dbConnect.js');

// Update Product
const updateProduct = async (req, res) => {
  const pool = await db.connect();
  const userId = req.user.id;
  const targetCompanyId = await pool.query('SELECT id FROM companies WHERE owner_id = $1', [userId]);
  const companyId = targetCompanyId.rows[0].id;
  const { id } = req.params;
  const { product_code, product_name, product_detail, unit_price } = req.body;

  try {
    const targetProduct = await pool.query('SELECT * FROM products WHERE id = $1 AND company_id = $2', [id, companyId]);
    if (targetProduct.rows.length === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }
    const existedProduct = targetProduct.rows[0];
    const updateData = await pool.query(`
      UPDATE products 
      SET product_code = $1,
          product_name = $2,
          product_detail = $3,
          unit_price = $4,
          updated_by = $5
      WHERE id = $6 AND company_id = $7
      RETURNING *;
    `, [
      product_code || existedProduct.product_code,
      product_name || existedProduct.product_name,
      product_detail || existedProduct.product_detail,
      unit_price || existedProduct.unit_price,
      userId,
      id,
      companyId
    ]);
    res.status(200).json({ message: 'Product updated successfully', product: updateData.rows[0] });
  } catch (error) {
    console.error('Update product error:', error);
    res.status(500).json({ message: 'Update product failed', error: error.message });
  } finally {
    pool.release();
  }
}

module.exports = { updateProduct };