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
// Petición para registrar una nueva categoría
export const registerCategoryThunk = createAsyncThunk(
  'category/register',
  async (categoryData, { rejectWithValue }) => {
    try {
      const response = await axios.post('https://alluring-enchantment-production.up.railway.app/categories/register', categoryData)
      return response.data
    } catch (error) {
      return rejectWithValue('Error al registrar la categoría')
    }
  }
)

// Petición para eliminar una categoría por ID
export const deleteCategoryThunk = createAsyncThunk(
  'characteristics/delete',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`https://alluring-enchantment-production.up.railway.app/characteristics/delete/${id}`)
      return response.data
    } catch (error) {
      return rejectWithValue('Error al eliminar la característica')
    }
  }
)

// Petición para actualizar una categoría por ID
export const updateCategoryThunk = createAsyncThunk(
  'category/update',
  async ({ categoryId, updatedData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`https://alluring-enchantment-production.up.railway.app/categories/update/${categoryId}`, updatedData)
      return response.data
    } catch (error) {
      return rejectWithValue('Error al actualizar la categoría')
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

  reducers: {
    reset(state) {
      state.success = false
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
      // Registrar categoría
      .addCase(registerCategoryThunk.pending, (state) => {
        state.loading = true
      })
      .addCase(registerCategoryThunk.fulfilled, (state, action) => {
        state.allCategories.push(action.payload)
        state.loading = false
      })
      .addCase(registerCategoryThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || 'Error al registrar la categoría'
      })

      // Eliminar categoría
      .addCase(deleteCategoryThunk.pending, (state) => {
        state.loading = true
      })
      .addCase(deleteCategoryThunk.fulfilled, (state, action) => {
        state.allCategories = state.allCategories.filter(category => category.id !== action.payload)
        state.loading = false
      })
      .addCase(deleteCategoryThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || 'Error al eliminar la categoría'
      })

      // Actualizar categoría
      .addCase(updateCategoryThunk.pending, (state) => {
        state.loading = true
      })
      .addCase(updateCategoryThunk.fulfilled, (state, action) => {
        const index = state.allCategories.findIndex(category => category.id === action.payload.id)
        if (index !== -1) {
          state.allCategories[index] = action.payload
        }
        state.loading = false
      })
      .addCase(updateCategoryThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || 'Error al actualizar la categoría'
      })
  }
})

export const { reset } = categorySlice.actions

export default categorySlice.reducer
