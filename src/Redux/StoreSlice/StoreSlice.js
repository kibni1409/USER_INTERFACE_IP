import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {StoreAPI} from "../API";

// Запрос на сервер, для получения данных хранилища
export const getStoreThunk = createAsyncThunk(
  'store/getStoreThunk',
  async function ({ storeID }, { rejectWithValue, dispatch }) {
    try {
      // Запрос на сервер
      let response = await StoreAPI.getStore(storeID)
      // Сохраняем результат
      dispatch(StoreSlice.actions.setStoreAC(response))
    } catch (error) {
      // Обработка ошибок
      rejectWithValue(error)
    }
  }
)

// Запрос на сервер, для обновления хранилища
export const putStoreThunk = createAsyncThunk(
  'store/putStoreThunk',
  async function ({ storeArray, totalCount, nextID, storeID }, { rejectWithValue, dispatch }) {
    try {
      // Запрос на сервер
      let response = await StoreAPI.putStore(storeArray, totalCount, nextID, storeID)
      // Сохранение результата
      dispatch(StoreSlice.actions.setStoreAC(response))
    } catch (error) {
      // Обработка ошибок
      rejectWithValue(error)
    }
  }
)

// Создание слайса для хранилища
const StoreSlice = createSlice({
  name: 'StoreSlice',
  initialState: {
    store: [],
    loading: false,
  },
  reducers: {
    setStoreAC(state, { payload }) {
      state.store = payload.store
      state.totalCount = payload.totalCount
      state.nextID = payload.nextID
    }
  },
  extraReducers: {
    [getStoreThunk.pending]: (state) => { state.loading = true }, // Начало работы функции
    [getStoreThunk.fulfilled]: (state) => { state.loading = false }, // Конец работы функции
    [getStoreThunk.rejected]: (state) => { state.loading = false }, // Ошибка функции
  },
})
export const { setStoreAC } = StoreSlice.actions

export default StoreSlice.reducer
