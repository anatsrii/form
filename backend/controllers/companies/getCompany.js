const db = require('../../config/dbConnect.js');

// Get All Companies
const getAllCompanies = async (req, res) => {
  const pool = await db.connect();
  const owner_id = req.user.id;
    try {
        console.log(owner_id)
        const companyData = await pool.query('SELECT * FROM companies WHERE owner_id = $1 AND deleted_at IS NULL', [ owner_id]);
        if (companyData.rows.length === 0) {
            return res.status(404).json({ message: "Company not found" });
        }
        res.status(200).json({ companies: companyData.rows });
    } catch (error) {
        console.error("Get companies error:", error);
        res.status(500).json({ message: "Get companies failed", error: error.message });
    } finally { 
        pool.release();
    }
};

// Get One Company by ID
const getCompany = async (req, res) => {
  const pool = await db.connect();
    try {
        const owner_id = req.user.id;
        const { id } = req.params;
        const targetCompany = await pool.query('SELECT * FROM companies WHERE id = $1 AND owner_id = $2 AND deleted_at IS NULL', [id, owner_id]);
        if (targetCompany.rows.length === 0) {
            return res.status(404).json({ message: "Company not found" });
        }
        res.status(200).json({ company: targetCompany.rows[0] });
    } catch (error) {
        console.error("Get company error:", error);
        res.status(500).json({ message: "Get company failed", error: error.message });
    } finally {
        pool.release();
    }
};


module.exports = { getAllCompanies, getCompany };