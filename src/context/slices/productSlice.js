import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchAllProductsThunk = createAsyncThunk(
  'product/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('https://alluring-enchantment-production.up.railway.app/autos/list')
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.mensaje || error.response?.data?.message)
    }
  }
)

export const fetchProductByIdThunk = createAsyncThunk(
  'product/fetchById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`https://alluring-enchantment-production.up.railway.app/autos/find/${id}`)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.mensaje || error.response?.data?.message)
    }
  }
)

function shuffleArray (array) {
  const length = array.length
  const shuffle = array.slice()
  for (let i = length - 1; i > 0; i -= 1) {
    const random = Math.floor(Math.random() * (i + 1))
    const current = shuffle[i]
    shuffle[i] = shuffle[random]
    shuffle[random] = current
  }
  return shuffle
}

export const productSlice = createSlice({
  name: 'product',
  initialState: {
    allProducts: [],
    totalProducts: 0,
    filteredProducts: null,
    resultsQuantity: 0,
    recommendedProducts: null,
    selectedCategory: 'Todos',
    selectedProduct: null,
    mainImg: '',
    otherImg: [],
    loading: false,
    error: null
  },

  reducers: {
    getProductsByCategory: (state, action) => {
      if (action.payload === 'Todos') {
        state.filteredProducts = state.allProducts
        state.selectedCategory = 'Todos'
      } else {
        state.filteredProducts = state.allProducts.filter((product) => product.categorias.some((categoria) => categoria.nombre === action.payload))
        state.selectedCategory = action.payload
      }
      state.resultsQuantity = state.filteredProducts.length
    },
    getRecommendedProducts: (state) => {
      state.recommendedProducts = state.allProducts
    },
    arrangeImagesGrid: (state) => {
      state.mainImg = state.selectedProduct.imagenes?.filter((img) => img.esPrincipal)
      state.otherImg = state.selectedProduct.imagenes?.filter((img) => !img.esPrincipal)
    },
    rearrangeImagesGrid: (state, action) => {
      const { selectedProduct, imgUrl } = action.payload
      state.mainImg = selectedProduct.imagenes?.filter((img) => img.url === imgUrl)
      state.otherImg = selectedProduct.imagenes?.filter((img) => img.url !== imgUrl)
    },
    resetSelectedProduct: (state) => {
      state.selectedProduct = null
    }
  },
  extraReducers: (builder) => {
    builder
    // featchAllProducts
      .addCase(fetchAllProductsThunk.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchAllProductsThunk.fulfilled, (state, action) => {
        state.allProducts = action.payload
        state.filteredProducts = shuffleArray(state.allProducts)
        state.totalProducts = state.allProducts.length
        state.resultsQuantity = state.filteredProducts.length
        state.selectedCategory = 'Todos'
        state.selectedProduct = null
        state.loading = false
      })
      .addCase(fetchAllProductsThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || 'Error al enviar datos'
      })

      // featchProductById
      .addCase(fetchProductByIdThunk.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchProductByIdThunk.fulfilled, (state, action) => {
        state.selectedProduct = action.payload
        state.loading = false
      })
      .addCase(fetchProductByIdThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || 'Error al enviar datos'
      })
  }
})

export const { getAllProducts, getProductsByCategory, getProductById, getRecommendedProducts, arrangeImagesGrid, rearrangeImagesGrid, resetSelectedProduct } = productSlice.actions

export default productSlice.reducer
