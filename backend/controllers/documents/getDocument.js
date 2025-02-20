const db = require('../../config/dbConnect.js');


// get all Document

const getAlldocument = async (req, res) => {
  const userId = req.user.id;
  const pool = await db.connect();

  try {
    const findCompany = await pool.query('SELECT * FROM companies WHERE owner_id = $1', [userId]);
    const companyUser = findCompany.rows[0];
    console.log(userId, companyUser.id);
    const allDocument = await pool.query('SELECT * FROM documents WHERE user_id = $1 AND company_id = $2 AND deleted_at IS NULL;', [userId, companyUser.id]);
    if (allDocument.rows.length === 0) {
      return res.status(404).send({ message: 'Document not found or you not have any document in the systems' });
    }
    return res.status(200).json(allDocument.rows);
  } catch (error) {
    console.error('Get all document error:', error);
    res.status(500).json({ message: 'Get all document failed', error: error.message });
  } finally {
    pool.release();
  }
}


// get one Document
const getDocument = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  const pool = await db.connect();

  try {
    const findCompany = await pool.query('SELECT * FROM companies WHERE owner_id = $1', [userId]);
    const companyUser = findCompany.rows[0].id;
    const findDocument = await pool.query('SELECT * FROM documents WHERE id = $1 AND user_id = $2 AND company_id = $3 AND deleted_at IS NULL;', [id, userId, companyUser]);
    if (findDocument.rows.length === 0) {
      return res.status(404).send({ message: 'Document not found or you not have any document in the systems' });
    }
    return res.status(200).json(findDocument.rows[0]);
  } catch (error) {
    console.error('Get document error:', error);
    res.status(500).json({ message: 'Get document failed', error: error.message });
  } finally {
    pool.release();
  }
}


module.exports = { getDocument, getAlldocument };