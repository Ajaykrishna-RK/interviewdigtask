

import { createSlice } from "@reduxjs/toolkit";




const storedUser = JSON.parse(localStorage.getItem('userData'));
const storedToken = JSON.parse(localStorage.getItem('token'));

const initialState = {
    userData: storedUser || null,
  token: storedToken || null,
  searchPost: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    clearState: (state) => {
      state.searchPost = [];
    },
    setLogin: (state, action) => {
      

      localStorage.setItem("userData", JSON.stringify(action.payload.user));
      localStorage.setItem("token", JSON.stringify(action.payload.token));
      state.userData = JSON.parse(localStorage.getItem("userData"));
      state.token = JSON.parse(localStorage.getItem("token"));
    },
    setLogout: (state) => {
      localStorage.removeItem("userData");
      localStorage.removeItem("token");
      state.userData = null;
      state.token = null;
    },
    setSearched: (state, action) => {
      state.searchPost = action.payload.searchPost;
    },
  },
});

export const { setLogin ,setLogout,setSearched,clearState} = authSlice.actions;
export default authSlice.reducer;