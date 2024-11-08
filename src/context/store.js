import { configureStore } from '@reduxjs/toolkit'

import productReducer from './slices/productSlice'
import categoryReducer from './slices/categorySlice'
import characteristicReducer from './slices/characteristicSlice'
import paginatorReducer from './slices/paginatorSlice'
import formReducer from './slices/formSlice'
import adminProductsReducer from './slices/adminProductSlice'
import adminUserReducer from './slices/adminUserSlice';

export default configureStore({
  reducer: {
    product: productReducer,
    category: categoryReducer,
    characteristic: characteristicReducer,
    paginator: paginatorReducer,
    form: formReducer,
    adminProducts: adminProductsReducer,
    adminUsers: adminUserReducer
  }
})
