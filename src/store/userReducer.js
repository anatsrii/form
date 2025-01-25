import { createSlice } from "@reduxjs/toolkit";
// user state
const initialUser = {
  userCompany: "",
  userName: "",
  userLastName: "",
  userPhone: "",
  userEmail: "",
  userAddress: "",
  userTaxId: "",
  editUserProfile: false,
};

// set state user
const userReducer = {
  setUserCompany: (state, action) => {
    state.userCompany = action.payload;
  },
  setUserName: (state, action) => {
    state.userName = action.payload;
  },
  setUserLastName: (state, action) => {
    state.userLastName = action.payload;
  },
  setUserPhone: (state, action) => {
    state.userPhone = action.payload;
  },
  setUserEmail: (state, action) => {
    state.userEmail = action.payload;
  },
  setUserAddress: (state, action) => {
    state.userAddress = action.payload;
  },
  setUserTaxId: (state, action) => {
    state.userTaxId = action.payload;
  },
  setEditUserProfile: (state, action) => {
    state.editUserProfile = action.payload;
  },
};

const userSlice = createSlice({
  name: "user",
  initialState: initialUser,
  reducers: userReducer,
});

export const {
  setUserCompany,
  setUserName,
  setUserLastName,
  setUserAddress,
  setUserEmail,
  setUserPhone,
  setUserTaxId,
  setEditUserProfile
} = userSlice.actions;
export default userSlice.reducer;
