import { configureStore } from "@reduxjs/toolkit";
import productSlice from "../features/productSlice";

const store = configureStore({
  reducer: {
    productKey: productSlice,
  },
});

export default store;