import { createSlice } from "@reduxjs/toolkit";
import { login } from "./authApiSlice";

const initialState = {
  isAuth: false,
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // builder.addCase(login.fulfilled, (state, action) => {
    //   // Access the data from the login response
    //   const { token, user } = action.payload;
    //   console.log("user", user);
    //   // Update the state in authSlice based on the login response
    //   state.token = token;
    //   state.user = user;
    //   state.isAuth = true;
    // });
  },
});

export default authSlice.reducer;
