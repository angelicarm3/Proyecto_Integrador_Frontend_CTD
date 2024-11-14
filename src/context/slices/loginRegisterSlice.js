import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchUserByUserNameThunk = createAsyncThunk(
  'users/fetchByUserName',
  async ({ userName, token }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://alluring-enchantment-production.up.railway.app/users/find/username/${userName}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Error desconocido')
    }
  }
)

const initialState = {
  loginOrRegister: '',
  formNumber: 1,
  loggedUser: {},
  isLoggedIn: false,
  isAdmin: false,
  token: localStorage.getItem('token') || null,
  userName: localStorage.getItem('userName') || null,
  loading: false,
  error: null,
  logInSuccess: false
}

export const loginRegisterSlice = createSlice({
  name: 'loginRegister',
  initialState,

  reducers: {
    setLoginOrRegister: (state, action) => {
      if (action.payload === '/inicio-sesion') {
        state.loginOrRegister = 'login'
      } else if (action.payload === '/registro') {
        state.loginOrRegister = 'register'
      }
    },
    changeFormNumber: (state, action) => {
      state.formNumber = action.payload
    },
    resetState: (state) => {
      return initialState
    }
  },
  extraReducers: (builder) => {
    builder
    // users
      .addCase(fetchUserByUserNameThunk.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchUserByUserNameThunk.fulfilled, (state, action) => {
        state.loggedUser = action.payload
        state.isLoggedIn = true
        if (action.payload.esAdmin) {
          state.isAdmin = true
        }
        state.loading = false
        state.logInSuccess = true
      })
      .addCase(fetchUserByUserNameThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || 'Error al enviar datos'
      })
  }
})

export const { setLoginOrRegister, changeFormNumber, resetState } = loginRegisterSlice.actions

export default loginRegisterSlice.reducer
