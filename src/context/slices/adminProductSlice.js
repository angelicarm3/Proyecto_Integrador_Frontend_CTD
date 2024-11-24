import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { fetchAllProductsThunk } from './productSlice'
import axios from 'axios'

export const fetchAllProductsAdminThunk = createAsyncThunk(
  'adminProducts/fetchAllProductsAdmin',
  async (_, { dispatch }) => {
    await dispatch(fetchAllProductsThunk())
  }
)

export const fetchProductByIdThunk = createAsyncThunk(
  'adminProducts/fetchProductById',
  async (productId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`https://alluring-enchantment-production.up.railway.app/autos/find/${productId}`)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.mensaje || error.response?.data?.message)
    }
  }
)

export const deleteProductThunk = createAsyncThunk(
  'form/deleteProduct',
  async ({ productId, token }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `https://alluring-enchantment-production.up.railway.app/autos/delete/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.mensaje || error.response?.data?.message)
    }
  }
)

export const adminProductsSlice = createSlice({
  name: 'adminProducts',
  initialState: {
    allProducts: [],
    totalProducts: 0,
    selectedProduct: {},
    loading: false,
    error: null,
    success: false
  },
  reducers: {
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload
    },
    resetStatus: (state) => {
      state.loading = false
      state.error = null
      state.success = false
      state.selectedProduct = {}
    }
  },
  extraReducers: (builder) => {
    // Fetch products
    builder.addCase(fetchAllProductsThunk.fulfilled, (state, action) => {
      state.allProducts = action.payload
      state.totalProducts = state.allProducts.length
    })

    // Fetch product by ID
    builder
      .addCase(fetchProductByIdThunk.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchProductByIdThunk.fulfilled, (state, action) => {
        state.loading = false
        state.selectedProduct = action.payload
      })
      .addCase(fetchProductByIdThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || 'Error al obtener el producto'
      })

      // Delete product
      .addCase(deleteProductThunk.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(deleteProductThunk.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
      })
      .addCase(deleteProductThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || 'Error al enviar datos'
      })
  }
})

export const { setSelectedProduct, resetStatus } = adminProductsSlice.actions
export default adminProductsSlice.reducer
