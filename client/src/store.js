import { configureStore, } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { productsApiSlice } from "./containers/products/productsApiSlice";
import productsReducer from "./containers/products/productsSlice";


export const store = configureStore({
  reducer: {
    [productsApiSlice.reducerPath]: productsApiSlice.reducer,
    products: productsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApiSlice.middleware),
});

setupListeners(store.dispatch);

export default store;
