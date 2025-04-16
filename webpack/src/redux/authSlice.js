import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("token") || null, // load token from localStorage if exists
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload; 
      localStorage.setItem("token", action.payload); // save to localStorage
    },
    clearToken: (state) => {
      state.token = null;
      localStorage.removeItem("token"); // remove from localStorage
    },
  },
});

export const { setToken, clearToken } = authSlice.actions;

export default authSlice.reducer;
