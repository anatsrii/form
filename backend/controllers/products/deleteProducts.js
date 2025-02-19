const db = require('../../config/dbConnect.js');


// Delete Product
const deleteProduct = async (req, res) => {
  const pool = await db.connect();
  const userId = req.user.id;
  const targetCompanyId = await pool.query('SELECT id FROM companies WHERE owner_id = $1', [userId]);
  const companyId = targetCompanyId.rows[0].id;
  const { id } = req.params;

  try {
    const targetProduct = await pool.query('SELECT * FROM products WHERE id = $1 AND company_id = $2', [id, companyId]);
    if (targetProduct.rows.length === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }
    const existedProduct = targetProduct.rows[0];
    const date = new Date().toLocaleString();
    await pool.query(`
      UPDATE products 
      SET deleted_at = $1,
          deleted_by = $2
      WHERE id = $3 AND company_id = $4;
    `, [
      date,
      userId,
      id,
      companyId
    ]);
    res.status(200).json({ message: `Product ${existedProduct.product_name} mark as deleted successfully`, product: existedProduct });
  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({ message: 'Delete product failed', error: error.message });
  } finally {
    pool.release();
  }
}

module.exports = { deleteProduct };