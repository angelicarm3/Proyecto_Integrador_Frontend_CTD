import { configureStore } from '@reduxjs/toolkit'
import productReducer from './slices/productSlice'
import paginatorReducer from './slices/paginatorSlice'
import formReducer from './slices/formSlice'
import adminProductsReducer from './slices/adminProductSlice'

export default configureStore({
  reducer: {
    product: productReducer,
    paginator: paginatorReducer,
    form: formReducer,
    adminProducts: adminProductsReducer
    // pagination: paginatorReducer,
    // dropdown: dropdownReducer,
    // productRow: productRowReducer,
  }
})
