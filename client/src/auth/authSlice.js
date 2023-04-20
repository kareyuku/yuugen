import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
  avatar: "",
  rank: "",
  isLoggedIn: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      localStorage.setItem('isLoggedIn', true)
      state.username = action.payload.username;
      state.avatar = action.payload.avatar;
      state.rank = action.payload.rank;
      state.isLoggedIn = true;
    },
    logOut: (state) => {
      localStorage.removeItem('isLoggedIn')
      state = initialState;
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;
