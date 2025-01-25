import { combineSlices, configureStore } from "@reduxjs/toolkit";
import customerSlice from "./customerReducer";
import documentSlice from "./documentReducer";
import productSlice from "./productReducer";
import userSlice from "./userReducer";

const rootReducer = combineSlices({
  user: userSlice,
  customer: customerSlice, 
  product: productSlice,
  document: documentSlice
});

const store = configureStore({
  reducer: rootReducer
});

export default store;