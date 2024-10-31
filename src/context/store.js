import { configureStore } from '@reduxjs/toolkit'
import productReducer from './slices/productSlice'
import paginatorReducer from './slices/paginatorSlice'
import formReducer from './slices/formSlice'

export default configureStore({
  reducer: {
    product: productReducer,
    paginator: paginatorReducer,
    form: formReducer,
  }
})
