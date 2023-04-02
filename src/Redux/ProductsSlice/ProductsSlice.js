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
    products: [],
    loading: false,
  },
  reducers: {
    setProductsAC(state, { payload }) {
      state.products = payload
    }
  },
  extraReducers: {
    [getProductsThunk.pending]: (state) => { state.loading = true},
    [getProductsThunk.fulfilled]: (state) => { state.loading = false},
    [getProductsThunk.rejected]: (state) => {state.loading = false},
  },
})
export const { setProductsAC } = ProductsSlice.actions

export default ProductsSlice.reducer
