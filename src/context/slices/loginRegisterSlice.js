import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchAllCategoriesThunk = createAsyncThunk(
  'category/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('https://alluring-enchantment-production.up.railway.app/categories/list')
      return response.data
    } catch (error) {
      return rejectWithValue('Error al obtener los datos')
    }
  }
)

export const loginRegisterSlice = createSlice({
  name: 'loginRegister',
  initialState: {
    loginOrRegister: '',
    formNumber: 1,
    loading: false,
    error: null,
    success: false
  },

  reducers: {
    setLoginOrRegister: (state, action) => {
      if (action.payload === '') {
        state.loginOrRegister = 'login'
      } else {
        state.loginOrRegister = 'register'
      }
    }
  },
  extraReducers: (builder) => {
    builder
    // categories
      .addCase(fetchAllCategoriesThunk.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchAllCategoriesThunk.fulfilled, (state, action) => {
        state.allCategories = action.payload
        state.loading = false
      })
      .addCase(fetchAllCategoriesThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || 'Error al enviar datos'
      })
  }
})

export const {} = loginRegisterSlice.actions

export default loginRegisterSlice.reducer
