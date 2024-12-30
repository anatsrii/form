import React from "react";
import '../style/invoicePage.css';

const InvoicePage = () => {
  return (
    <div className="invoice-container">
      <header className="invoice-header">
        <div className="company-info">
          <h1>IVOmaker</h1>
          <p>บริษัท เงินทองไหลมาหาเรา จำกัด</p>
          <p>ที่อยู่: 41/94 บางกะปิ กรุงเทพฯ</p>
          <p>เบอร์โทร: 094 185 9962</p>
          <p>อีเมล: support@ivomaker.com</p>
        </div>
        <div className="invoice-info">
          <h2>ใบเสร็จรับเงิน / ใบกำกับภาษี</h2>
          <p>เลขที่: #20200709121945</p>
          <p>วันที่ออก: 09-07-2020</p>
          <p>เอกสารอ้างอิง: </p>
        </div>
      </header>

      <main className="invoice-main">
        <section className="customer-info">
          <p>ได้รับเงินจาก</p>
          <p> บริษัท มั่งมีแพรพลอย จำกัด</p>
          <p>คุณ ผู้รับรอง ค้าขายร่ำรวย</p>
          <p>ที่อยู่: 99/9 บางน้ำทิพย์ นครสวรรค์</p>
          <p>เบอร์โทร: 092 062 1556</p>
          <p>เลขประจำตัวผู้เสียภาษี: 0123456789012</p>
        </section>

        <table className="invoice-table">
          <thead>
            <tr>
              <th>รหัสสินค้า</th>
              <th>รายการ</th>
              <th>รายละเอียด</th>
              <th>ราคา</th>
              <th>จำนวน</th>
              <th>รวม</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>IT01</td>
              <td>Awei หูฟัง ไร้สาย</td>
              <td>รุ่น A920BL</td>
              <td>500.00</td>
              <td>2</td>
              <td>1,000.00</td>
            </tr>
            <tr>
              <td>IT02</td>
              <td>หูฟัง HOCO</td>
              <td>M1 Stereo มีไมค์ ปุ่มปรับคลื่นเสียง</td>
              <td>300.00</td>
              <td>2</td>
              <td>600.00</td>
            </tr>
            <tr>
              <td>IT03</td>
              <td>Xiaomi Mi Wireless Charging Pad 10W</td>
              <td>ที่ชาร์จแบบไร้สาย 10 วัตต์</td>
              <td>400.00</td>
              <td>1</td>
              <td>400.00</td>
            </tr>
          </tbody>
        </table>
      </main>

      <footer className="invoice-footer">
        <div className="totals">
          <p>รวมจำนวนเงิน: 2,000.00</p>
          <p>ภาษีมูลค่าเพิ่ม: 140.00</p>
          <p>ยอดเงินสุทธิ: 2,140.00</p>
        </div>
        <div className="signature">
          <p>ขอแสดงความนับถือ</p>
          <p>-------------------------</p>
          <p>( Yowapa Opasee )</p>
          <p>เจ้าหน้าที่ผู้รับเงิน</p>
        </div>
      </footer>
    </div>
  );
};

export default InvoicePage;
