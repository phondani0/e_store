import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { productsApiSlice } from "./containers/products/productsApiSlice";
import productsReducer from "./containers/products/productsSlice";
import { cartApiSlice } from "./containers/Cart/cartApiSlice";
import cartReducer from "./containers/Cart/cartSlice";

export const store = configureStore({
  reducer: {
    [productsApiSlice.reducerPath]: productsApiSlice.reducer,
    [cartApiSlice.reducerPath]: cartApiSlice.reducer,
    products: productsReducer,
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      productsApiSlice.middleware,
      cartApiSlice.middleware
    ),
});

setupListeners(store.dispatch);

export default store;
