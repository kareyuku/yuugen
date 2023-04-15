import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
  avatar: "",
  isLoggedIn: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.username = action.payload.username;
      state.avatar = action.payload.avatar;
      state.isLoggedIn = true;
    },
    logOut: (state) => {
      state = initialState;
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;
