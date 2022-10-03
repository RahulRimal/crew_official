import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "./features/filter/filterSlice";
import productOptionsReducer from "./features/productOptions/productOptionsSlice";
import cartReducer from "./features/cart/cartSlice";

export const store = configureStore({
  reducer: {
    filter: filterReducer,
    productOptions: productOptionsReducer,
    cart: cartReducer,
  },
});
