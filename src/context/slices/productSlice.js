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

export const fetchProductsByTimeFrameThunk = createAsyncThunk(
  'product/fetchProductByTimeFrame',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { product: { selectedDates } } = getState()

      const response = await axios.get(`https://alluring-enchantment-production.up.railway.app/autos/find/available?fechaInicio=${selectedDates.startDate}&fechaFin=${selectedDates.endDate}`)
      return { response: response.data, selectedDates }
    } catch (error) {
      return rejectWithValue(error.response?.data?.mensaje || error.response?.data?.message)
    }
  }
)

const filterProducts = (products, searchTerm, selectedCategory, availableProducts) => {
  const term = searchTerm.toLowerCase()

  return products.filter((product) => {
    const matchesTerm =
    searchTerm === '' ||
      (product.marca && product.marca.toLowerCase().includes(term)) ||
      (product.modelo && product.modelo.toLowerCase().includes(term)) ||
      (product.caracteristicas &&
        Array.isArray(product.caracteristicas) &&
        product.caracteristicas.some((caracteristica) =>
          caracteristica.nombre.toLowerCase().includes(term)
        ))

    const matchesCategory =
      selectedCategory === 'Todos' ||
      product.categorias.some((categoria) => categoria.nombre === selectedCategory)

    const matchesTimeFrame =
      !availableProducts || availableProducts.length === 0 ||
      availableProducts?.some(
        (availableProduct) => availableProduct.id === product.id)

    return matchesTerm && matchesCategory && matchesTimeFrame
  })
}

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
    suggestions: [],
    selectedCategory: 'Todos',
    searchTerm: '',
    selectedDates: {
      startDate: null,
      endDate: null
    },
    availableProducts: [],
    selectedProduct: null,
    mainImg: '',
    otherImg: [],
    loading: false,
    error: null
  },

  reducers: {
    getProductsByCategory: (state, action) => {
      state.selectedCategory = action.payload
      state.filteredProducts = filterProducts(state.allProducts, state.searchTerm, state.selectedCategory, state.availableProducts)
      state.resultsQuantity = state.filteredProducts.length
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload
    },
    setSelectedDates: (state, action) => {
      state.selectedDates = action.payload
    },
    setSuggestions: (state, action) => {
      if (action.payload === '') {
        state.suggestions = []
      } else {
        const term = state.searchTerm.toLowerCase()
        const allMatchesSet = new Set()

        state.filteredProducts.forEach((product) => {
          if (product.marca && product.marca.toLowerCase().includes(term)) {
            allMatchesSet.add(product.marca)
          }
          if (product.modelo && product.modelo.toLowerCase().includes(term)) {
            allMatchesSet.add(product.modelo)
          }
          if (product.caracteristicas && Array.isArray(product.caracteristicas)) {
            product.caracteristicas.forEach((caracteristica) => {
              if (caracteristica.nombre.toLowerCase().includes(term)) {
                allMatchesSet.add(caracteristica.nombre)
              }
            })
          }
        })

        state.suggestions = Array.from(allMatchesSet)
      }
    },
    getProductsBySearchTerm: (state) => {
      state.filteredProducts = filterProducts(state.allProducts, state.searchTerm, state.selectedCategory, state.availableProducts)
      state.resultsQuantity = state.filteredProducts.length
    },
    getRecommendedProducts: (state) => {
      state.recommendedProducts = state.allProducts
    },
    arrangeImagesGrid: (state, action) => {
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
    },
    resetSearchBar: (state) => {
      state.searchTerm = ''
      state.suggestions = []
      state.filteredProducts = filterProducts(state.allProducts, state.searchTerm, state.selectedCategory, state.availableProducts)
      state.resultsQuantity = state.filteredProducts.length
    },
    resetDatePicker: (state) => {
      state.selectedDates = { startDate: null, endDate: null }
      state.availableProducts = []
      state.filteredProducts = filterProducts(state.allProducts, state.searchTerm, state.selectedCategory, state.availableProducts)
      state.resultsQuantity = state.filteredProducts.length
    },
    resetFilters: (state) => {
      state.filteredProducts = state.allProducts
      state.resultsQuantity = state.filteredProducts.length
      state.selectedCategory = 'Todos'
      state.suggestions = []
      state.searchTerm = ''
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
        state.allProducts = shuffleArray(action.payload)
        state.filteredProducts = filterProducts(state.allProducts, state.searchTerm, state.selectedCategory, state.availableProducts)
        state.totalProducts = state.allProducts.length
        state.resultsQuantity = state.filteredProducts.length
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

      // fetchProductsByTimeFrameThunk
      .addCase(fetchProductsByTimeFrameThunk.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchProductsByTimeFrameThunk.fulfilled, (state, action) => {
        state.availableProducts = action.payload.response
        state.selectedDates = action.payload.selectedDates
        state.filteredProducts = filterProducts(state.allProducts, state.searchTerm, state.selectedCategory, state.availableProducts)
        state.resultsQuantity = state.filteredProducts.length
        state.loading = false
      })
      .addCase(fetchProductsByTimeFrameThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || 'Error al enviar datos'
      })
  }
})

export const { getProductsByCategory, setSearchTerm, setSelectedDates, setSuggestions, getProductsBySearchTerm, getProductsByTimeFrame, getProductById, getRecommendedProducts, arrangeImagesGrid, rearrangeImagesGrid, resetSelectedProduct, resetSearchBar, resetDatePicker, resetFilters } = productSlice.actions

export default productSlice.reducer
