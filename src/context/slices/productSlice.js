import { createSlice } from '@reduxjs/toolkit'

import { productsData } from '../../data/products'

export const productSlice = createSlice({
  name: 'product',
  initialState: {
    allProducts: [],
    filteredProducts: null,
    recommendedProducts: null,
    selectedCategory: 'All',
    selectedProduct: {},
    mainImg: '',
    otherImg: []
  },

  reducers: {
    getAllProducts: (state) => {
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
      state.allProducts = shuffleArray(productsData.products)
      state.filteredProducts = state.allProducts
      state.selectedCategory = 'All'
      state.selectedProduct = {}
    },
    getProductsByCategory: (state, action) => {
      if (action.payload === 'All') {
        state.filteredProducts = state.allProducts
        state.selectedCategory = 'All'
      } else {
        state.filteredProducts = state.allProducts.filter((product) => product.categorias.includes(action.payload))
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
      state.mainImg = state.selectedProduct.imagenes?.filter((img) => img.es_principal)
      state.otherImg = state.selectedProduct.imagenes?.filter((img) => !img.es_principal)
    },
    rearrangeImagesGrid: (state, action) => {
      state.mainImg = state.selectedProduct.imagenes?.filter((img) => img.id === action.payload)
      state.otherImg = state.selectedProduct.imagenes?.filter((img) => img.id !== action.payload)
    }
  }
})

export const { getAllProducts, getProductsByCategory, getProductById, getRecommendedProducts, arrangeImagesGrid, rearrangeImagesGrid } = productSlice.actions

export default productSlice.reducer
