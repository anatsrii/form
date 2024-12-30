import React, { useContext } from 'react';
import '../style/dashboard.css';
import { AccountSettingsContext } from '../context/AccountSettingsContext.js';

const CustomerProfile = () => {
  const { companyName, name, lastName, phone, email, address, editCustomerProfile } = useContext(AccountSettingsContext);

  return (
    <div className="profileSection">
      <img src="https://via.placeholder.com/100" alt="Profile" />
      <h3>{companyName}</h3>
      <p><span>ชื่อ  {name}</span> <span>นามสกุล  {lastName}</span></p>
      <p><span>เบอร์ติดต่อ : {phone}</span></p>
      <p><span>Email : {email}</span></p>
      <p><span>ที่อยู่ : {address}</span></p>
      <div className='profile-btn'>
        <button onClick={editCustomerProfile}>แก้ไขข้อมูลลูกค้า</button>
      </div>
    </div>
  );
}

export default CustomerProfile;