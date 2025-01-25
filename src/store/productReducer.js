import { createSlice } from '@reduxjs/toolkit';
import ThaiBahtText from 'thai-baht-text';

const initialState = {
  productList: [
    {
      productCode: '',
      productName: '',
      productDetail: '',
      productQuantity: '',
      productPrice: '',
      totalPrice: '',
    },
  ],
  discount: 0,
  totalProductPrice: 0,
  vat: 0,
  grandTotal: 0,
  grandTotalText: ''
};

const calculateTotalPrice = (product) => {
  return (product.productQuantity * product.productPrice);
};

const calculateVat = (totalProductPrice) => {
  return (totalProductPrice * 0.07);
};

const calculateGrandTotal = (totalProductPrice, vat) => {
  return (totalProductPrice + vat);
};

const convertToThaiBath = (grandTotal) => {
  return ThaiBahtText(grandTotal);
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProductList: (state, action) => {
      state.productList = action.payload;
      state.totalProductPrice = state.productList.reduce((sum, product) => {
        product.totalPrice = calculateTotalPrice(product);
        return sum + product.totalPrice;
      }, 0) - state.discount;
      state.vat = calculateVat(state.totalProductPrice);
      state.grandTotal = calculateGrandTotal(state.totalProductPrice, state.vat);
      state.grandTotalText = convertToThaiBath(state.grandTotal);
    },
    addProduct: (state) => {
      state.productList.push({
        productCode: '',
        productName: '',
        productDetail: '',
        productQuantity: '',
        productPrice: '',
        totalPrice: '',
      });
    },
    updateProduct: (state, action) => {
      const { index, product } = action.payload;
      state.productList[index] = { ...state.productList[index], ...product };
      state.productList[index].totalPrice = calculateTotalPrice(state.productList[index]);
      state.totalProductPrice = state.productList.reduce((sum, product) => sum + product.totalPrice, 0) - state.discount;
      state.vat = calculateVat(state.totalProductPrice);
      state.grandTotal = calculateGrandTotal(state.totalProductPrice, state.vat);
      state.grandTotalText = convertToThaiBath(state.grandTotal);
    },
    removeProduct: (state, action) => {
      const index = action.payload;
      state.productList.splice(index, 1);
      state.totalProductPrice = state.productList.reduce((sum, product) => sum + product.totalPrice, 0) - state.discount;
      state.vat = calculateVat(state.totalProductPrice);
      state.grandTotal = calculateGrandTotal(state.totalProductPrice, state.vat);
      state.grandTotalText = convertToThaiBath(state.grandTotal);
    },
    updateDiscount: (state, action) => {
      state.discount = action.payload;
      state.totalProductPrice = state.productList.reduce((sum, product) => sum + product.totalPrice, 0) - state.discount;
      state.vat = calculateVat(state.totalProductPrice);
      state.grandTotal = calculateGrandTotal(state.totalProductPrice, state.vat);
      state.grandTotalText = convertToThaiBath(state.grandTotal);
    },
   
  },
});

export const { setProductList, addProduct, updateProduct, removeProduct, updateDiscount } = productSlice.actions;

export default productSlice.reducer;