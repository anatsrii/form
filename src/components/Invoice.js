import React, { useContext } from 'react';
import { DataContext } from '../context/DataContext.js';

function Invoice () {
  //use CustomerContext to get the customer information
  const { customerCompany, customerName, customerPhone, customerAddress, customerTaxId, customerEmail, userCompany, userName, userPhone, userEmail, userAddress, userTaxId} = useContext(DataContext);

 

  


  return (
    <div className="invoice-container">
      <header className="invoice-header">
        <div className="company-info">
          <h1>{}</h1>
          <p>{userCompany}</p>
          <p>{userName}</p>
          <p>ที่อยู่: {userAddress}</p>
          <p>เบอร์ที่ติดต่อได้: {userPhone}</p>
          <p>Email: {userEmail}</p>
          <p>เลขประจำตัวผู้เสียภาษี: {userTaxId}</p>
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
          <p> {customerCompany}</p>
          <p>คุณ {customerName}</p>
          <p>ที่อยู่: {customerAddress}</p>
          <p>เบอร์โทร: {customerPhone}</p>
          <p>Email: {customerEmail}</p>
          <p>เลขประจำตัวผู้เสียภาษี: {customerTaxId}</p>
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
              <form>
              <td><input type='text'></input></td>
              <td><input type='text'></input></td>
              <td><input type='text'></input></td>
              <td><input type='number'></input></td>
              <td><input type='number'></input></td>
              <td><input type='number'></input></td>
              </form>
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
      <div className="print-button"> 
      <button onClick={ console.log('Download PDF')}>Download PDF</button>
      </div>
    </div>
  );
  
}

export default Invoice;