import { configureStore } from '@reduxjs/toolkit'
import UserSlice from "./UserSlice/UserSlice";
import StoreSlice from "./StoreSlice/StoreSlice";
import ProductsSlice from "./ProductsSlice/ProductsSlice";

// Создание стора из слайсов
export default configureStore({
  reducer: {
    User: UserSlice,
    Store: StoreSlice,
    Products: ProductsSlice
  },
})
