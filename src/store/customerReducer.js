import { createSlice } from "@reduxjs/toolkit"

// customer state
const initialCustomer = {
  customerCompany: 'Three Cat Limited',
  customerName: 'Sukar',
  customerLastName: 'Srii',
  customerPhone: '099-1234567',
  customerEmail: 'sukar@threecat.com',
  customerAddress: '117/7 Chaiyaphum',
  customerTaxId: '123456789012',
  editCustomerProfile: false,
}

// set state customer
const customerReducer = {
  setCustomerCompany: (state, action) => { state.customerCompany = action.payload; },
  setCustomerName: (state, action) => { state.customerName = action.payload; },
  setCustomerLastName: (state, action) => { state.customerLastName = action.payload; },
  setCustomerPhone: (state, action) => { state.customerPhone = action.payload; },
  setCustomerEmail: (state, action) => { state.customerEmail = action.payload; },
  setCustomerAddress: (state, action) => { state.customerAddress = action.payload; },
  setCustomerTaxId: (state, action) => { state.customerTaxId = action.payload; },
  setEditCustomerProfile: (state, action) => { state.editCustomerProfile = action.payload; }
};

const customerSlice = createSlice({
  name: 'customer',
  initialState: initialCustomer,
  reducers: customerReducer
});

export const { 
  setCustomerCompany, 
  setCustomerName, 
  setCustomerLastName, 
  setCustomerPhone, 
  setCustomerEmail, 
  setCustomerAddress, 
  setCustomerTaxId, 
  setEditCustomerProfile 
} = customerSlice.actions;

export default customerSlice.reducer;

