import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {ProductsAPI} from "../API";

export const getProductsThunk = createAsyncThunk(
  'products/getProductsThunk',
  async function ({ productsID }, { rejectWithValue, dispatch }) {
    try {
      let response = await ProductsAPI.getProducts(productsID)
      dispatch(ProductsSlice.actions.setProductsAC(response))
    } catch (error) {
      rejectWithValue(error)
    }
  }
)

const ProductsSlice = createSlice({
  name: 'ProductsSlice',
  initialState: {
    products: []
  },
  reducers: {
    setProductsAC(state, { payload }) {
      state.products = payload
    }
  },
  extraReducers: {
    [getProductsThunk.pending]: () => {},
    [getProductsThunk.fulfilled]: () => {},
    [getProductsThunk.rejected]: () => {},
  },
})
export const { setProductsAC } = ProductsSlice.actions

export default ProductsSlice.reducer
