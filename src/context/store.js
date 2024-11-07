import { configureStore } from '@reduxjs/toolkit'
import productReducer from './slices/productSlice'
import paginatorReducer from './slices/paginatorSlice'
import formReducer from './slices/formSlice'
import adminProductsReducer from './slices/adminProductSlice'
import adminUserReducer from './slices/adminUserSlice';

export default configureStore({
  reducer: {
    product: productReducer,
    paginator: paginatorReducer,
    adminProducts: adminProductsReducer,
    form: formReducer,
    adminUsers: adminUserReducer,
  }
})
