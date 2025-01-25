import React from 'react';
import '../style/dashboard.css';
import {useSelector, useDispatch} from 'react-redux';
import {setUserName, setUserLastName, setUserCompany, setUserEmail, setUserPhone, setUserAddress, setUserTaxId} from '../store/userReducer'

const UserSettings = () => {

  const dispatch = useDispatch();
  const {userName, userLastName, userCompany, userAddress, userEmail, userPhone, userTaxId, editUserProfile} = useSelector((state) => state.user);

  const changeCompanyName = (e) => {
    dispatch(setUserCompany(e.target.value));
  };

  const changeName = (e) => {
    dispatch(setUserName(e.target.value));
  };

  const changeLastName = (e) => {
    dispatch(setUserLastName(e.target.value));
  };

  const changePhone = (e) => {
    dispatch(setUserPhone(e.target.value));
  };

  const changeEmail = (e) => {
    dispatch(setUserEmail(e.target.value));
  };

  const changeAddress = (e) => {
    dispatch(setUserAddress(e.target.value));
  };

  const changeTaxId = (e) => {    
    dispatch(setUserTaxId(e.target.value));
  }

  return (
      <div className="settingsSection">
      {editUserProfile && (
        <form>
          <label>ชื่อบริษัท</label>
          <input type="text" value={userCompany} onChange={changeCompanyName} />
          <label>ชื่อ</label>
          <input type="text" value={userName} onChange={changeName} />
          <label>สกุล</label>
          <input type="text" value={userLastName} onChange={changeLastName} />
          <label>เบอร์ติดต่อ</label>
          <input type="text" value={userPhone} onChange={changePhone} />
          <label>Email</label>
          <input type="email" value={userEmail} onChange={changeEmail} />
          <label>ที่อยู่</label>
          <input type="text" value={userAddress} onChange={changeAddress} />
          <label>เลขผู้เสียภาษี</label>
          <input type="text" value={userTaxId} onChange={changeTaxId} />
          <button>Update</button>
        </form>
      )}
    </div>
  );
}

export default UserSettings;