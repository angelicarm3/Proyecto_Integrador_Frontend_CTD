import { configureStore } from '@reduxjs/toolkit'

import adminCategoryReducer from './slices/adminCategorySlice'
import adminCharacteristicReducer from './slices/adminCharacteristicSlice'
import adminProductsReducer from './slices/adminProductSlice'
import adminUserReducer from './slices/adminUserSlice'
import bookinsReducer from './slices/bookinsSlice'
import categoryReducer from './slices/categorySlice'
import favoritesReducer from './slices/favoritesSlice'
import formReducer from './slices/formSlice'
import loginRegisterReducer from './slices/loginRegisterSlice'
import paginatorReducer from './slices/paginatorSlice'
import productReducer from './slices/productSlice'

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
    favorites: favoritesReducer,
    bookins: bookinsReducer
  }
})
