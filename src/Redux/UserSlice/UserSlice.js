import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {UserAPI} from "../API";

export const SingInThunk = createAsyncThunk(
  'user/SingInThunk',
  async function ({ login, password }, { rejectWithValue, dispatch }) {
    try {
      let response = await UserAPI.SingIn(login, password)
      dispatch(UserSlice.actions.setUserAC(response))
      localStorage.setItem('user', JSON.stringify(response))
    } catch (error) {
      rejectWithValue(error)
    }
  }
)

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
