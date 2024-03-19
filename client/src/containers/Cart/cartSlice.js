import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    // Define reducers for handling local state changes
    // For example, adding/removing items from the cart
    // You can add them here if needed
  },
  extraReducers: (builder) => {
    builder
      // Handle the fetchCart query
      .addMatcher(
        (action) => action.type.endsWith("/fetchCart/fulfilled"),
        (state, action) => {
          state.cartItems = action.payload || [];
          state.isLoading = false;
          state.error = null;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/fetchCart/pending"),
        (state) => {
          state.isLoading = true;
          state.error = null;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/fetchCart/rejected"),
        (state, action) => {
          state.isLoading = false;
          state.error = action.error.message;
        }
      )
      // Handle the addToCart mutation
      .addMatcher(
        (action) => action.type.endsWith("/addToCart/fulfilled"),
        (state, action) => {
          // Update cartItems state after successful mutation
          state.cartItems = [...state.cartItems, ...action.payload.data];
          state.isLoading = false;
          state.error = null;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/addToCart/pending"),
        (state) => {
          state.isLoading = true;
          state.error = null;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/addToCart/rejected"),
        (state, action) => {
          state.isLoading = false;
          state.error = action.error.message;
        }
      );
  },
});

// export const {} = cartSlice.actions;

export default cartSlice.reducer;
