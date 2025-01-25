import '../style/dashboard.css';
import { useSelector, useDispatch } from 'react-redux';
import {setCustomerCompany, setCustomerName, setCustomerLastName, setCustomerAddress, setCustomerEmail, setCustomerPhone, setCustomerTaxId, } from '../store/customerReducer.js'

const CustomerSettings = () => {
  const { customerCompany, customerName, customerLastName, customerPhone, customerEmail, customerAddress, customerTaxId,  editCustomerProfile} = useSelector((state) => state.customer);

  const dispatch = useDispatch()


  const changeCompanyName = (e) => {
    dispatch(setCustomerCompany(e.target.value));
  };

  const changeName = (e) => {
    dispatch(setCustomerName(e.target.value));
  };

  const changeLastName = (e) => {
    dispatch(setCustomerLastName(e.target.value));
  };

  const changePhone = (e) => {
    dispatch(setCustomerPhone(e.target.value));
  };

  const changeEmail = (e) => {
    dispatch(setCustomerEmail(e.target.value));
  };

  const changeAddress = (e) => {
    dispatch(setCustomerAddress(e.target.value));
  };

  const changeTaxId = (e) => {    
    dispatch(setCustomerTaxId(e.target.value));
  }

  

  return (
    <div className="settingsSection">
      {editCustomerProfile && (
        <form>
          <label>ชื่อบริษัท</label>
          <input type="text" value={customerCompany} onChange={changeCompanyName} />
          <label>ชื่อ</label>
          <input type="text" value={customerName} onChange={changeName} />
          <label>สกุล</label>
          <input type="text" value={customerLastName} onChange={changeLastName} />
          <label>เบอร์ติดต่อ</label>
          <input type="text" value={customerPhone} onChange={changePhone} />
          <label>Email</label>
          <input type="email" value={customerEmail} onChange={changeEmail} />
          <label>ที่อยู่</label>
          <input type="text" value={customerAddress} onChange={changeAddress} />
          <label>เลขประจำตัวผู้เสียภาษี</label>
          <input type="text" value={customerTaxId} onChange={changeTaxId} />
          <button>Update</button>
        </form>
      )}
    </div>
  );
}

export default CustomerSettings;