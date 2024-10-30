import { configureStore } from '@reduxjs/toolkit'
import productReducer from './slices/productSlice'
import paginatorReducer from './slices/paginatorSlice'
// import paginationReducer from './slices/paginationSlice'
// import dropdownReducer from './slices/dropDownSlice'
// import adminProductsReducer from './slices/adminProductSlice'
// import productRowReducer from './slices/productRowSlice'


export default configureStore({
  reducer: {
    product: productReducer,
    paginator: paginatorReducer,
    // pagination: paginatorReducer,
    // dropdown: dropdownReducer,
    // adminProducts: adminProductsReducer,
    // productRow: productRowReducer,
  }
})
