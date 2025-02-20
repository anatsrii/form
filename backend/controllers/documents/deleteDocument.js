const db = require('../../config/dbConnect.js');
const today = require('../../config/date.js');

//delete Document
const deleteDocument = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  const pool = await db.connect();

  try {
    const findDocument = await pool.query('SELECT * FROM documents WHERE id = $1 AND user_id = $2 AND deleted_at IS NULL;', [id, userId]);
    console.log(findDocument.rows[0]);
    if (findDocument.rows.length === 0) {
      return res.status(404).send({ message: 'Document not found' });
    }
    const deleteDate = today.dateNow();
    const result = await pool.query('UPDATE documents SET deleted_at = $1, delete_by = $2 WHERE id = $3 AND user_id = $4 AND company_id = $5 RETURNING *;', [deleteDate, userId, id, userId, findDocument.rows[0].company_id]);
    return res.status(200).json({ message: `Document ${result.rows[0].doc_type} doc_id ${result.rows[0].doc_id} mark as deleted`});
  } catch (error) {
    console.error('Delete document error:', error);
    res.status(500).json({ message: 'Delete document failed', error: error.message });
  } finally {
    pool.release();
  }
}

module.exports = { deleteDocument };