import React, { useContext } from 'react';
import '../style/dashboard.css';
import { AccountSettingsContext } from '../context/AccountSettingsContext.js';

const UserSettings = () => {
  const { companyName, setCompanyName, name, setName, lastName, setLastName, phone, setPhone, email, setEmail, address, setAddress, edit, taxId, setTaxId } = useContext(AccountSettingsContext);

  const changeCompanyName = (e) => {
    setCompanyName(e.target.value);
  };

  const changeName = (e) => {
    setName(e.target.value);
  };

  const changeLastName = (e) => {
    setLastName(e.target.value);
  };

  const changePhone = (e) => {
    setPhone(e.target.value);
  };

  const changeEmail = (e) => {
    setEmail(e.target.value);
  };

  const changeAddress = (e) => {
    setAddress(e.target.value);
  };

  const changeTaxId = (e) => {    
    setTaxId(e.target.value);
  }

  return (
    <div className="settingsSection">
      {edit && (
        <form>
          <label>ชื่อบริษัท</label>
          <input type="text" value={companyName} onChange={changeCompanyName} />
          <label>ชื่อ</label>
          <input type="text" value={name} onChange={changeName} />
          <label>สกุล</label>
          <input type="text" value={lastName} onChange={changeLastName} />
          <label>เบอร์ติดต่อ</label>
          <input type="text" value={phone} onChange={changePhone} />
          <label>Email</label>
          <input type="email" value={email} onChange={changeEmail} />
          <label>ที่อยู่</label>
          <input type="text" value={address} onChange={changeAddress} />
          <label>เลขผู้เสียภาษี</label>
          <input type="text" value={taxId} onChange={changeTaxId} />
          <button>Update</button>
        </form>
      )}
    </div>
  );
}

export default UserSettings;