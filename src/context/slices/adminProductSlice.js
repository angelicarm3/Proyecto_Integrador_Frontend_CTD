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
    console.log('productId:', productId)
    try {
      const response = await axios.get(`https://alluring-enchantment-production.up.railway.app/autos/find/${productId}`)
      console.log('response data ', response.data)
      return response.data
    } catch (error) {
      console.error('error en la solicitud', error)
      return rejectWithValue(error.response?.data?.mensaje || 'Error desconocido')
    }
  }
)

export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async (productId, { rejectWithValue }) => {
    try {
      const response = await fetch(`https://alluring-enchantment-production.up.railway.app/autos/find/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: productId })
      })

      if (!response.ok) {
        throw new Error('Failed to update product')
      }

      const data = await response.json()
      return data
    } catch (error) {
      return rejectWithValue(error.message)
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
      return rejectWithValue(error.response.data.mensaje)
    }
  }
)

export const adminProductsSlice = createSlice({
  name: 'adminProducts',
  initialState: {
    allProducts: [],
    loading: false,
    error: null,
    success: false,
    itemsToShow: 10,
    currentPage: 1,
    selectedProduct: {}
  },
  reducers: {
    setItemsToShow: (state, action) => {
      state.itemsToShow = action.payload
      state.currentPage = 1
    },
    setPage: (state, action) => {
      state.currentPage = action.payload
    },
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
      state.currentPage = 1
    })
      // Delete product
      .addCase(deleteProductThunk.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(deleteProductThunk.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.allProducts = state.allProducts.filter(
          (product) => product.id !== action.meta.arg
        )
      })
      .addCase(deleteProductThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || 'Error al enviar datos'
      })
  }
})

export const { setItemsToShow, setPage, setSelectedProduct, resetStatus } = adminProductsSlice.actions
export default adminProductsSlice.reducer
