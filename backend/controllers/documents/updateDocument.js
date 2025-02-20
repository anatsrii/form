const db = require('../../config/dbConnect.js');

// update Document
const updateDocument = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  const pool = await db.connect();
 
  try {
    const existingDocument = await pool.query('SELECT * FROM documents WHERE id = $1 AND user_id = $2 AND deleted_at IS NULL;' , [id, userId]);
    const existDoc = existingDocument.rows[0];
    if (existingDocument.rows.length === 0) {
      return res.status(404).send({ message: 'Document not found' });
    }
    const { company_id, user_id, doc_type, doc_date, doc_status, currency, exchange_rate, sub_total, discount_amount, vat_rate, vat_amount, grand_total, grand_total_text, updated_by, doc_id, created_by, serial_number } = req.body;

    const updateDate = new Date().toLocaleDateString();

    const sqlcmd = `UPDATE documents 
                    SET company_id = COALESCE($1, company_id),
                        user_id = COALESCE($2, user_id),
                        doc_type = COALESCE($3, doc_type),
                        doc_date = COALESCE($4, doc_date),
                        doc_status = COALESCE($5, doc_status),
                        currency = COALESCE($6, currency),
                        exchange_rate = COALESCE($7, exchange_rate),
                        sub_total = COALESCE($8, sub_total),
                        discount_amount = COALESCE($9, discount_amount),
                        vat_rate = COALESCE($10, vat_rate),
                        vat_amount = COALESCE($11, vat_amount),
                        grand_total = COALESCE($12, grand_total),
                        grand_total_text = COALESCE($13, grand_total_text),
                        updated_at = $14,
                        updated_by = COALESCE($15, updated_by),
                        doc_id = COALESCE($16, doc_id),
                        created_by = COALESCE($17, created_by),
                        serial_number = COALESCE($18, serial_number)
                    WHERE id = $19 AND user_id = $20 RETURNING *;`;
    
    const insertValues = [
      company_id || existDoc.company_id,
      user_id || existDoc.user_id,
      doc_type || existDoc.doc_type,
      doc_date || existDoc.doc_date,
      doc_status || existDoc.doc_status,
      currency || existDoc.currency,
      exchange_rate || existDoc.exchange_rate,
      sub_total || existDoc.sub_total,
      discount_amount || existDoc.discount_amount,
      vat_rate || existDoc.vat_rate,
      vat_amount || existDoc.vat_amount,
      grand_total || existDoc.grand_total,
      grand_total_text || existDoc.grand_total_text,
      updateDate,
      updated_by || existDoc.updated_by,
      doc_id || existDoc.doc_id,
      created_by || existDoc.created_by,
      serial_number || existDoc.serial_number,
      id,
      userId
    ];
    
    // update document
    const result = await pool.query(sqlcmd, insertValues);
    return res.status(200).json({ message: 'Document updated', document: result.rows[0] });
  } catch (error) {
    console.error('Update document error:', error);
    res.status(500).json({ message: 'Update document failed', error: error.message });
  } finally {
    pool.release();
  }
}

module.exports = { updateDocument };
