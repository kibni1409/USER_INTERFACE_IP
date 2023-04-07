import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {UserAPI} from "../API";
import {setLocalStorage} from "../WorkWithLocalStorage";

// Запрос на сервер, для авторизации пользователя
export const SingInThunk = createAsyncThunk(
  'user/SingInThunk',
  async function ({ login, password }, { rejectWithValue, dispatch }) {
    try {
      // Запрос на сервер
      let response = await UserAPI.SingIn(login, password)
      // Сохранение результата
      dispatch(UserSlice.actions.setUserAC(response))
      setLocalStorage('user', JSON.stringify(response))
    } catch (error) {
      // Обработка ошибок
      rejectWithValue(error)
    }
  }
)

// Создание пользовательского слайса
const UserSlice = createSlice({
  name: 'UserSlice',
  initialState: {
    user: {
      login: null,
      products: null,
      store: null,
    }
  },
  reducers: {
    // Сохранение данных пользователя
    setUserAC(state, { payload }) {
      state.user = payload
    }
  },
  extraReducers: {
    [SingInThunk.pending]: () => {},
    [SingInThunk.fulfilled]: () => {},
    [SingInThunk.rejected]: () => {},
  },
})
export const { getArticles } = UserSlice.actions

export default UserSlice.reducer
