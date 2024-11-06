import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchAllProductsThunk = createAsyncThunk(
  'product/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('https://alluring-enchantment-production.up.railway.app/autos/list')
      return response.data
    } catch (error) {
      return rejectWithValue('Error al obtener los datos')
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
    filteredProducts: null,
    recommendedProducts: null,
    selectedCategory: 'All',
    selectedProduct: null,
    mainImg: '',
    otherImg: []
  },

  reducers: {
    getProductsByCategory: (state, action) => {
      if (action.payload === 'All') {
        state.filteredProducts = state.allProducts
        state.selectedCategory = 'All'
      } else {
        state.filteredProducts = state.allProducts.filter((product) => product.categorias.some((categoria) => categoria.nombre === action.payload))
        state.selectedCategory = action.payload
      }
    },
    getRecommendedProducts: (state) => {
      state.recommendedProducts = state.allProducts
    },
    getProductById: (state, action) => {
      const product = state.allProducts.filter((product) => product.id === parseInt(action.payload))
      state.selectedProduct = product[0]
    },
    arrangeImagesGrid: (state) => {
      state.mainImg = state.selectedProduct.imagenes?.filter((img) => img.esPrincipal)
      state.otherImg = state.selectedProduct.imagenes?.filter((img) => !img.esPrincipal)
    },
    rearrangeImagesGrid: (state, action) => {
      const { selectedProduct, imgUrl } = action.payload
      state.mainImg = selectedProduct.imagenes?.filter((img) => img.url === imgUrl)
      state.otherImg = selectedProduct.imagenes?.filter((img) => img.url !== imgUrl)
    }
  },
  extraReducers: (builder) => {
    builder
    // submitForm
      .addCase(fetchAllProductsThunk.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchAllProductsThunk.fulfilled, (state, action) => {
        state.allProducts = action.payload
        state.filteredProducts = shuffleArray(state.allProducts)
        state.selectedCategory = 'All'
        state.selectedProduct = null
        state.loading = false
      })
      .addCase(fetchAllProductsThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || 'Error al enviar datos'
      })
  }
})

export const { getAllProducts, getProductsByCategory, getProductById, getRecommendedProducts, arrangeImagesGrid, rearrangeImagesGrid } = productSlice.actions

export default productSlice.reducer
