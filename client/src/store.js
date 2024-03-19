import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { productsApiSlice } from "./containers/products/productsApiSlice";
import productsReducer from "./containers/products/productsSlice";
import { cartApiSlice } from "./containers/Cart/cartApiSlice";
import cartReducer from "./containers/Cart/cartSlice";
import { authApiSlice } from "./containers/Auth/authApiSlice";
import authReducer from "./containers/Auth/authSlice";

export const store = configureStore({
  reducer: {
    [productsApiSlice.reducerPath]: productsApiSlice.reducer,
    [cartApiSlice.reducerPath]: cartApiSlice.reducer,
    products: productsReducer,
    cart: cartReducer,
    [authApiSlice.reducerPath]: authApiSlice.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      productsApiSlice.middleware,
      cartApiSlice.middleware,
      authApiSlice.middleware
    ),
});

setupListeners(store.dispatch);

export default store;
