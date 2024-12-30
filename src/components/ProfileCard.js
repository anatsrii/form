import React, { useContext } from 'react';
import '../style/dashboard.css';
import { AccountSettingsContext } from '../context/AccountSettingsContext.js';

const ProfileCard = () => {
  const { companyName, name, lastName, phone, email, address, editProfile } = useContext(AccountSettingsContext);

  return (
    <div className="profileSection">
      <img src="https://via.placeholder.com/100" alt="Profile" />
      <h3>{companyName}</h3>
      <p><span>ชื่อ  {name}</span> <span>นามสกุล  {lastName}</span></p>
      <p><span>เบอร์ติดต่อ : {phone}</span></p>
      <p><span>Email : {email}</span></p>
      <p><span>ที่อยู่ : {address}</span></p>
      <div className="stats">
        <p>จำนวนเอกสารทั้งหมด <b>32</b></p>
        <p>จำนวนใบเสร็จ <b>26</b></p>
        <p>จำนวนใบเสนอราคา <b>6</b></p>
      </div>
      <div className='profile-btn'>
        <button onClick={editProfile}>แก้ไขโปรไฟล์</button>
      </div>
    </div>
  );
}

export default ProfileCard;