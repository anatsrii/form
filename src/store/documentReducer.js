import { createSlice } from "@reduxjs/toolkit";

const initialDocument = {
  docType:'',
  invoiceNumber: '',
  createDate: '',
  documentReference: '',
  receiveBy:'',
  remark:'',
  paymentOption:''
};

const documentReducer = {
  setDocType: (state, action) => {state.docType = action.payload},
  setInvoiceNumber: (state, action) => { state.invoiceNumber = action.payload; },
    setCreateDate: (state, action) => { state.createDate = action.payload; },
    setDocumentReference: (state, action) => { state.documentReference = action.payload; },
    setReceiveBy: (state, action) => {state.receiveBy = action.payload},
    setRemark: (state, action) => { state.remark = action.payload},
    setPaymentOption: (state, action) => {state.paymentOption = action.payload}
};

const documentSlice = createSlice({
  name: 'document',
  initialState: initialDocument,
  reducers: documentReducer
});

export const {
  setDocType,
  setInvoiceNumber,
  setCreateDate,
  setDocumentReference,
  setReceiveBy,
  setPaymentOption,
  setRemark
} = documentSlice.actions

export default documentSlice.reducer;