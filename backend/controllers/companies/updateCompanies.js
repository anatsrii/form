const db = require('../../config/dbConnect.js');


const updateCompany = async (req, res) => {
  const owner_id = req.user.id;
  const { id } = req.params;
  const { company_name, contact_name, contact_lastname, phone, email, house_no, village, village_no, soi, road, sub_district, district, province, postal_code, tax_id } = req.body;
  const pool = await db.connect();

  try {
    const existed = await pool.query('SELECT * FROM companies WHERE id = $1 AND owner_id = $2', [id, owner_id]);
    if (existed.rows.length === 0) {
        return res.status(404).json({ message: 'Company not found' });
    }
    const existedCompany = existed.rows[0];
    console.log(`log existedCompany.tax_id`,existedCompany.tax_id);
    let updateData;
    if (tax_id !== existedCompany.tax_id) {
        // กรณีมีการเปลี่ยน tax_id
        const checkDuplicate = await pool.query(
            'SELECT id FROM companies WHERE tax_id = $1 AND id != $2;',
            [tax_id, id]
        );
        console.log(checkDuplicate.rows);
    
        if (checkDuplicate.rows.length > 0) {
            return res.status(400).json({ message: "Tax ID already exists" });
        }
    
        // ถ้าไม่ซ้ำ ค่อยอัพเดททั้งหมดรวม tax_id
        updateData = await pool.query(`
            UPDATE companies 
            SET company_name = $1, 
                contact_name = $2,
                contact_lastname = $3,
                phone = $4,
                email = $5,
                house_no = $6,
                village = $7,
                village_no = $8,
                soi = $9,
                road = $10,
                sub_district = $11,
                district = $12,
                province = $13,
                postal_code = $14,
                tax_id = $15
            WHERE id = $16 AND owner_id = $17
            RETURNING *;
        `, [
            company_name || existedCompany.company_name,
            contact_name || existedCompany.contact_name,
            contact_lastname || existedCompany.contact_lastname,
            phone || existedCompany.phone,
            email || existedCompany.email,
            house_no || existedCompany.house_no,
            village || existedCompany.village,
            village_no || existedCompany.village_no,
            soi || existedCompany.soi,
            road || existedCompany.road,
            sub_district || existedCompany.sub_district,
            district || existedCompany.district,
            province || existedCompany.province,
            postal_code || existedCompany.postal_code,
            tax_id,
            id,
            owner_id
        ]);
    } else {
        // กรณีไม่มีการเปลี่ยน tax_id
        updateData = await pool.query(`
            UPDATE companies 
            SET company_name = $1, 
                contact_name = $2,
                contact_lastname = $3,
                phone = $4,
                email = $5,
                house_no = $6,
                village = $7,
                village_no = $8,
                soi = $9,
                road = $10,
                sub_district = $11,
                district = $12,
                province = $13,
                postal_code = $14
            WHERE id = $15 AND owner_id = $16
            RETURNING *;
        `, [
            company_name || existedCompany.company_name,
            contact_name || existedCompany.contact_name,
            contact_lastname || existedCompany.contact_lastname,
            phone || existedCompany.phone,
            email || existedCompany.email,
            house_no || existedCompany.house_no,
            village || existedCompany.village,
            village_no || existedCompany.village_no,
            soi || existedCompany.soi,
            road || existedCompany.road,
            sub_district || existedCompany.sub_district,
            district || existedCompany.district,
            province || existedCompany.province,
            postal_code || existedCompany.postal_code,
            id,
            owner_id
        ]);
    }

      res.status(200).json({ message: 'Company data updated successfully', company: updateData.rows[0] });

  } catch (error) {
      console.error('Update company error:', error);
      res.status(500).json({ message: 'Update company failed', error: error.message });
  } finally {
      if (pool) {
          pool.release();
      }
  }
};

module.exports = { updateCompany };