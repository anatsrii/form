import '../style/dashboard.css';
import { useSelector, useDispatch } from 'react-redux';
import {setEditCustomerProfile} from '../store/customerReducer.js'

const CustomerProfile = () => {
  const { customerCompany, customerName, customerLastName, customerPhone, customerEmail, customerAddress, customerTaxId, editCustomerProfile} = useSelector((state) => state.customer);

  const dispatch = useDispatch();

  const showEditMenu = () => {
    dispatch(setEditCustomerProfile(!editCustomerProfile))
  }

  return (
    <div className="profileSection">
      <img src="https://via.placeholder.com/100" alt="Profile" />
      <h3>{customerCompany}</h3>
      <p><span>ชื่อ  {customerName}</span> <span>นามสกุล  {customerLastName}</span></p>
      <p><span>เบอร์ติดต่อ : {customerPhone}</span></p>
      <p><span>Email : {customerEmail}</span></p>
      <p><span>ที่อยู่ : {customerAddress}</span></p>
      <p><span>เลขประจำตัวผู้เสียภาษี : {customerTaxId}</span></p>
      <div className='profile-btn'>
        <button onClick={showEditMenu}>แก้ไขข้อมูลลูกค้า</button>
      </div>
    </div>
  );
}

export default CustomerProfile;