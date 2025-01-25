import '../style/dashboard.css';
import { useSelector, useDispatch } from 'react-redux';
import {setEditUserProfile} from '../store/userReducer';

const UserProfile = () => {
  const {userCompany, userName, userLastName, userPhone,  userEmail,  userAddress, userTaxId, editUserProfile} = useSelector((state) => state.user)

  const dispatch = useDispatch();

  const showEditMenu = () => {
    dispatch(setEditUserProfile(!editUserProfile));
  }

  return (
     <div className="profileSection">
      <img src="https://via.placeholder.com/100" alt="Profile" />
      <h3>{userCompany}</h3>
      <p><span>ชื่อ  {userName}</span> <span>นามสกุล  {userLastName}</span></p>
      <p><span>เบอร์ติดต่อ : {userPhone}</span></p>
      <p><span>Email : {userEmail}</span></p>
      <p><span>ที่อยู่ : {userAddress}</span></p>
      <p><span>เลขประจำตัวผู้เสียภาษี : {userTaxId}</span></p>
      <div className='profile-btn'>
        <button onClick={showEditMenu}>แก้ไขข้อมูล</button>
      </div>
    </div>
  );
}

export default UserProfile;