import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchAllCategoriesThunk = createAsyncThunk(
  'adminCategories/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('https://alluring-enchantment-production.up.railway.app/categories/list')
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.mensaje || error.response?.data?.message)
    }
  }
)

export const fetchCategoryByIdThunk = createAsyncThunk(
  'adminCategories/fetchCharacteristicById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`https://alluring-enchantment-production.up.railway.app/categories/find/${id}`)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.mensaje || error.response?.data?.message)
    }
  }
)

// Thunk para borrar una categoría por ID
export const deleteCategoryThunk = createAsyncThunk(
  'adminCategories/delete',
  async ({ id, token }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`https://alluring-enchantment-production.up.railway.app/categories/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.mensaje || error.response?.data?.message)
    }
  }
)

export const adminCategorySlice = createSlice({
  name: 'category',
  initialState: {
    allCategories: [],
    totalCategories: 0,
    selectedCategory: {},
    loading: false,
    error: null,
    success: false
  },

  reducers: {
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload
    },
    resetStatus: (state) => {
      state.loading = false
      state.error = null
      state.success = false
      state.selectedCategory = {}
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch categories
      .addCase(fetchAllCategoriesThunk.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchAllCategoriesThunk.fulfilled, (state, action) => {
        state.allCategories = action.payload
        state.totalCategories = state.allCategories.length
        state.loading = false
      })
      .addCase(fetchAllCategoriesThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || 'Error al enviar datos'
      })

    // Fetch category by ID
    builder
      .addCase(fetchCategoryByIdThunk.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchCategoryByIdThunk.fulfilled, (state, action) => {
        state.selectedCategory = action.payload
        state.loading = false
      })
      .addCase(fetchCategoryByIdThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || 'Error al obtener la categoría'
      })

      // Delete a category
      .addCase(deleteCategoryThunk.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(deleteCategoryThunk.fulfilled, (state, action) => {
        // Filtrar la categoría eliminada del estado
        state.allCategories = state.allCategories.filter(
          (category) => category.id !== action.meta.arg
        )
        state.loading = false
        state.success = true
      })
      .addCase(deleteCategoryThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || 'Error al eliminar la categoría'
      })
  }
})

export const { setSelectedCategory, resetStatus } = adminCategorySlice.actions

export default adminCategorySlice.reducer
