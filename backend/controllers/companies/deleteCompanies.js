const db = require('../../config/dbConnect.js');

// Delete Company
const deleteCompany = async (req, res) => {
    const pool = await db.connect();
  try {
      const owner_id = req.user.id;
      const { id } = req.params;
      const result = await pool.query('SELECT * FROM companies WHERE id = $1 AND owner_id = $2 RETURNING *', [id, owner_id]);
      if (result.rows.length === 0) {
          return res.status(404).json({ message: "Company not found" });
      }
        const now = new Date().toLocalString();
        await pool.query('UPDATE companies SET deleted_at = $1, deleted_by = $2 WHERE id = $3 AND owner_id = $4', [now, owner_id, id, owner_id]);
      res.status(200).json({ message: "Company mark as deleted successfully", company: result.rows[0] });
  } catch (error) {
      console.error("Delete company error:", error);
      res.status(500).json({ message: "Delete company failed", error: error.message });
  } finally {
      pool.release();
  } 
};

module.exports = { deleteCompany };
