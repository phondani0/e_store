import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, { payload }) => {
      state.userInfo = payload.user;
      state.token = payload.token;
    },
    logout: (state) => {
      state.userInfo = null;
      state.token = null;
    },
  },
  // extraReducers: (builder) => {
  //   builder.addCase("login.fulfilled", (state, action) => {
  //     // Access the data from the login response
  //     const { token, user } = action.payload;
  //     console.log("user", user);
  //     // Update the state in authSlice based on the login response
  //     state.token = token;
  //     state.user = user;
  //     state.isAuth = true;
  //   });
  // },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
