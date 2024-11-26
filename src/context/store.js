import { configureStore } from '@reduxjs/toolkit'

import productReducer from './slices/productSlice'
import categoryReducer from './slices/categorySlice'
import paginatorReducer from './slices/paginatorSlice'
import formReducer from './slices/formSlice'
import loginRegisterReducer from './slices/loginRegisterSlice'
import adminProductsReducer from './slices/adminProductSlice'
import adminUserReducer from './slices/adminUserSlice'
import adminCharacteristicReducer from './slices/adminCharacteristicSlice'
import adminCategoryReducer from './slices/adminCategorySlice'
import favoritesReducer from './slices/favoritesSlice'

export default configureStore({
  reducer: {
    product: productReducer,
    category: categoryReducer,
    paginator: paginatorReducer,
    form: formReducer,
    loginRegister: loginRegisterReducer,
    adminProducts: adminProductsReducer,
    adminUsers: adminUserReducer,
    adminCharacteristic: adminCharacteristicReducer,
    adminCategory: adminCategoryReducer,
    favorites: favoritesReducer
  }
})
