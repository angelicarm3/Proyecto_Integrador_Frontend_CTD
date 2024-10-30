import { createSlice } from '@reduxjs/toolkit'

export const productRowSlice = createSlice({
  name: 'productRow',
  initialState: {
    hiddenProducts: [], // Usamos un array para ocultar productos
    selectedProduct: null // Producto que se está editando
  },

  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload
    },
    hideProduct: (state, action) => {
      if (!state.hiddenProducts.includes(action.payload)) {
          state.hiddenProducts.push(action.payload);
      }
  },  
    deleteProduct: (state, action) => {
      state.products = state.products.filter(product => product.id !== action.payload)
    },
    editProduct: (state, action) => {
      const productIndex = state.products.findIndex(product => product.id === action.payload.id)
      if (productIndex !== -1) {
        state.products[productIndex] = action.payload
        state.selectedProduct = action.payload
      }
    },
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload
    }
  }
})

export const { setProducts, hideProduct, deleteProduct, editProduct, setSelectedProduct } = productRowSlice.actions

export default productRowSlice.reducer
