const db = require('../../config/dbConnect.js');

const genDocId = async (docType) => {
    const pool = await db.connect();
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const dateString = `${day}${month}${year}`;

    // แปลง docType ให้เป็นตัวพิมพ์ใหญ่ และใช้แค่ 3 ตัวแรก
    const docPrefix = docType.substring(0, 3).toUpperCase();

    try {
        // ดึงหมายเลขล่าสุดของ docType จากปีปัจจุบัน
        const query = `
            SELECT doc_id 
            FROM documents 
            WHERE doc_id LIKE $1 
            ORDER BY doc_id DESC 
            LIMIT 1`;
        
        const likePattern = `${docPrefix}%${year}`;
        const result = await pool.query(query, [likePattern]);

        let runningNumber = 1; // ค่าเริ่มต้นเมื่อไม่มีข้อมูลของปีนี้

        if (result.rows.length > 0) {
            // ดึงค่าหมายเลขรันล่าสุดจาก doc_id
            const lastDocId = result.rows[0].doc_id;
            const lastRunningNum = parseInt(lastDocId.slice(docPrefix.length, docPrefix.length + 4), 10);
            runningNumber = lastRunningNum + 1;
        }

        // แปลง runningNumber ให้เป็น 4 หลัก
        const runningStr = String(runningNumber).padStart(4, '0');

        // สร้างรหัสเอกสารใหม่
        const newDocId = `${docPrefix}${runningStr}${dateString}`;

        return newDocId;
    } catch (error) {
        console.error("Error generating document ID:", error);
        throw error;
    } finally {
        pool.release();
    }
};

// Create Document
const createDocument = async (req, res) => {
    const client = await db.connect();
    try {
        await client.query("BEGIN TRANSACTION ISOLATION LEVEL SERIALIZABLE");

        const userId = req.user.id;
        const getUserName = await client.query('SELECT * FROM users WHERE id = $1', [userId]);
        const { doc_type, doc_date, doc_status, currency, exchange_rate, sub_total, discount_amount, vat_rate, vat_amount, grand_total, grand_total_text } = req.body;

        if (!doc_type || !doc_date || !doc_status || !currency || !exchange_rate || !sub_total || !discount_amount || !vat_rate || !vat_amount || !grand_total || !grand_total_text) {
            return res.status(400).json({ message: 'Please provide all required data' });
        }

        // ดึง company_id ของ user
        const targetCompanyId = await client.query('SELECT id FROM companies WHERE owner_id = $1', [userId]);
        if (targetCompanyId.rows.length === 0) {
            return res.status(400).json({ message: "Company not found" });
        }
        const companyId = targetCompanyId.rows[0].id;

        // ตรวจสอบ serial_number ล่าสุด
        const serialNumberQuery = await client.query(
            `SELECT COALESCE(MAX(serial_number), 0) + 1 AS next_serial FROM documents WHERE company_id = $1`,
            [companyId]
        );
        const serialNumber = serialNumberQuery.rows[0].next_serial;

        // ดึงรหัสเอกสารใหม่
        const docId = await genDocId(doc_type);
        
        // บันทึกข้อมูลเอกสารลงฐานข้อมูล
        const result = await client.query(
            `INSERT INTO documents (company_id, user_id, doc_type, doc_date, doc_status, currency, exchange_rate, sub_total, discount_amount, vat_rate, vat_amount, grand_total, grand_total_text, updated_by, doc_id, created_by, serial_number) 
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17) 
             RETURNING *`,
            [companyId, userId, doc_type, doc_date, doc_status, currency, exchange_rate, sub_total, discount_amount, vat_rate, vat_amount, grand_total, grand_total_text, userId, docId, getUserName.rows[0].first_name, serialNumber]
        );

        await client.query("COMMIT");

        return res.status(201).json({ 
            message: 'Create document successfully',
            document: result.rows[0]
        });
    } catch (error) {
        await client.query("ROLLBACK");
        console.error('Create document error:', error);
        res.status(500).json({ message: 'Create document failed', error: error.message });
    } finally {
        client.release();
    }
};

module.exports = { createDocument };
