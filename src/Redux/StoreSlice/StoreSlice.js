import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {StoreAPI} from "../API";

export const getStoreThunk = createAsyncThunk(
  'store/getStoreThunk',
  async function ({ storeID }, { rejectWithValue, dispatch }) {
    try {
      let response = await StoreAPI.getStore(storeID)
      dispatch(StoreSlice.actions.setStoreAC(response))
    } catch (error) {
      rejectWithValue(error)
    }
  }
)

const StoreSlice = createSlice({
  name: 'StoreSlice',
  initialState: {
    store: [],
    loading: false,
  },
  reducers: {
    setStoreAC(state, { payload }) {
      state.store = payload
    }
  },
  extraReducers: {
    [getStoreThunk.pending]: (state) => { state.loading = true },
    [getStoreThunk.fulfilled]: (state) => { state.loading = false },
    [getStoreThunk.rejected]: (state) => { state.loading = false },
  },
})
export const { setStoreAC } = StoreSlice.actions

export default StoreSlice.reducer
