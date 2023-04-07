import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {ProductsAPI} from "../API";

// Получить список продкутов
export const getProductsThunk = createAsyncThunk(
  'products/getProductsThunk',
  async function ({ productsID }, { rejectWithValue, dispatch }) {
    try {
      // Запрос на сервер о получении продуктов
      let response = await ProductsAPI.getProducts(productsID)
      // Записываем результат в стейт
      dispatch(ProductsSlice.actions.setProductsAC(response))
    } catch (error) {
      // Обработка ошибок
      rejectWithValue(error)
    }
  }
)

// Создание нового продукта
export const putProductsThunk = createAsyncThunk(
  'products/postProductsThunk',
  async function ({ productsArray, totalCount, nextID, productsID}, { rejectWithValue, dispatch }) {
    try {
      // Запрос на сервер о создании нового продукта
      let response = await ProductsAPI.putProducts(productsArray, totalCount, nextID, productsID)
      // Сохраняем результат
      dispatch(ProductsSlice.actions.setProductsAC(response))
    } catch (error) {
      // Обработка ошибок
      rejectWithValue(error)
    }
  }
)

// Создание слайса для продуктов
const ProductsSlice = createSlice({
  name: 'ProductsSlice',
  initialState: {
    products: [],
    totalCount: 0,
    nextID: 0,
    loading: false,
  },
  reducers: {
    setProductsAC(state,  { payload }) {
      console.log(payload)
      state.products = payload.products
      state.totalCount = payload.totalCount
      state.nextID = payload.nextID
    }
  },
  extraReducers: {
    [getProductsThunk.pending]: (state) => { state.loading = true}, // Событие, когда функция начала работу
    [getProductsThunk.fulfilled]: (state) => { state.loading = false}, // Событие, когда функция закончила работу
    [getProductsThunk.rejected]: (state) => {state.loading = false}, // Событие, когда функция выдала ошибку
  },
})
export const { setProductsAC } = ProductsSlice.actions

export default ProductsSlice.reducer
