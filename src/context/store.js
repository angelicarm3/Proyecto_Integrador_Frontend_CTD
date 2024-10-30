import { configureStore } from '@reduxjs/toolkit'
import productReducer from './slices/productSlice'
import paginatorReducer from './slices/paginatorSlice'
import adminProductsReducer from './slices/adminProductSlice'
// import paginationReducer from './slices/paginationSlice'
// import dropdownReducer from './slices/dropDownSlice'

// import productRowReducer from './slices/productRowSlice'


export default configureStore({
  reducer: {
    product: productReducer,
    paginator: paginatorReducer,
    adminProducts: adminProductsReducer,
    // pagination: paginatorReducer,
    // dropdown: dropdownReducer,
    // productRow: productRowReducer,
  }
})
