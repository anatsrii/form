import { Link } from "react-router";

function Sidebar () {
  return (
    <div className="sidebar">
      <h2>การจัดการ</h2>
      <ul>
        <Link to={'/'}><li>หน้าแรก </li></Link>
        <Link to={'/my-documents'}><li>เอกสารของฉัน</li></Link>
        <Link to={'/dashboard'}><li>ข้อมูลส่วนตัว</li></Link>
        <Link to={'/customer'}><li>ข้อมูลลูกค้า</li></Link>
        <Link to={`/bill`}><li>ใบเสร็จรับเงิน/ใบกำกับภาษี</li></Link>
        <li>ใบรับสินค้า</li>
        <li>ใบส่งสินค้า</li>
      </ul>
    </div>
  );
}

export default Sidebar; 

