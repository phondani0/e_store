import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  status: "idle",
  error: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  // extraReducers: builder => {
  //   builder
  //     .addCase(useFetchProductsQuery.pending, state => {
  //       state.status = 'loading';
  //     })
  //     .addCase(useFetchProductsQuery.fulfilled, (state, action) => {
  //       state.status = 'succeeded';
  //       state.products = action.payload;
  //     })
  //     .addCase(useFetchProductsQuery.rejected, (state, action) => {
  //       state.status = 'failed';
  //       state.error = action.error.message;
  //     });
  // },
});

export default productsSlice.reducer;
