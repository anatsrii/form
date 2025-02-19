const db = require('../../config/dbConnect.js');

// Get All Products
const getAllProducts = async (req, res) => {
  const pool = await db.connect();
  const userId = req.user.id;
  const targetCompanyId = await pool.query('SELECT id FROM companies WHERE owner_id = $1', [userId]);
  const companyId = targetCompanyId.rows[0].id;
  try {
    const productData = await pool.query('SELECT * FROM products WHERE company_id = $1 AND deleted_at IS NULL', [companyId]);
    if (productData.rows.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ products: productData.rows });
  } catch (error) {
    console.error("Get products error:", error);
    res.status(500).json({ message: "Get products failed", error: error.message });
  } finally {
    pool.release();
  }
}

// Get One Product by ID
const getProduct = async (req, res) => {
  const pool = await db.connect();
  const userId = req.user.id;
  const targetCompanyId = await pool.query('SELECT id FROM companies WHERE owner_id = $1', [userId]);
  const companyId = targetCompanyId.rows[0].id;
  try {
    const { id } = req.params;
    const targetProduct = await pool.query('SELECT * FROM products WHERE id = $1 AND company_id = $2 AND deleted_at IS NULL', [id, companyId]);
    if (targetProduct.rows.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ product: targetProduct.rows[0] });
  } catch (error) {
    console.error("Get product error:", error);
    res.status(500).json({ message: "Get product failed", error: error.message });
  } finally {
    pool.release();
  }
};

module.exports = { getAllProducts, getProduct };

