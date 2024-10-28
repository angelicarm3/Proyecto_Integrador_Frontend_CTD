import { configureStore } from '@reduxjs/toolkit'
import productReducer from './slices/productSlice'
import paginatorReducer from './slices/paginatorSlice'

export default configureStore({
  reducer: {
    product: productReducer,
    paginator: paginatorReducer
  }
})
