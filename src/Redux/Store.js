import { configureStore } from '@reduxjs/toolkit'
import UserSlice from "./UserSlice/UserSlice";
import StoreSlice from "./StoreSlice/StoreSlice";
import ProductsSlice from "./ProductsSlice/ProductsSlice";

export default configureStore({
  reducer: {
    User: UserSlice,
    Store: StoreSlice,
    Products: ProductsSlice
  },
})
