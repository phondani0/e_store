import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { productsApiSlice } from "./containers/products/productsApiSlice";
import productsReducer from "./containers/products/productsSlice";
import { cartApiSlice } from "./containers/Cart/cartApiSlice";
import cartReducer from "./containers/Cart/cartSlice";
import { authApiSlice } from "./containers/Auth/authApiSlice";
import authReducer from "./containers/Auth/authSlice";
import { checkoutApiSlice } from "./containers/Checkout/checkoutApiSlice";

export const store = configureStore({
    reducer: {
        [productsApiSlice.reducerPath]: productsApiSlice.reducer,
        [cartApiSlice.reducerPath]: cartApiSlice.reducer,
        [authApiSlice.reducerPath]: authApiSlice.reducer,
        [checkoutApiSlice.reducerPath]: checkoutApiSlice.reducer,
        products: productsReducer,
        cart: cartReducer,
        auth: authReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            productsApiSlice.middleware,
            cartApiSlice.middleware,
            authApiSlice.middleware,
            cartApiSlice.middleware
        ),
});

setupListeners(store.dispatch);

export default store;
