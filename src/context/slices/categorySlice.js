import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchAllCategoriesThunk = createAsyncThunk(
  'category/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('https://alluring-enchantment-production.up.railway.app/categories/list')
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.mensaje || error.response?.data?.message)
    }
  }
)

export const categorySlice = createSlice({
  name: 'category',
  initialState: {
    allCategories: [],
    loading: false,
    error: null
  },

  reducers: {},
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

export const {} = categorySlice.actions

export default categorySlice.reducer
