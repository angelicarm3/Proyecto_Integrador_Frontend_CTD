import { configureStore } from '@reduxjs/toolkit'
import productReducer from './slices/productSlice'
import paginatorReducer from './slices/paginatorSlice'
import adminProductsReducer from './slices/adminProductSlice'


export default configureStore({
  reducer: {
    product: productReducer,
    paginator: paginatorReducer,
    adminProducts: adminProductsReducer,
  }
})
