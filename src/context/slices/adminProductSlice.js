import { createSlice } from '@reduxjs/toolkit';
import { productsData } from '../../data/products';

export const adminProductsSlice = createSlice({
  name: 'adminProducts',
  initialState: {
    allProducts: productsData.products,
    itemsToShow: 10,
    currentPage: 1,

  },
  reducers: {
    setItemsToShow: (state, action) => {
      state.itemsToShow = action.payload;
      state.currentPage = 1
    },
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
});

export const { setItemsToShow, setPage } = adminProductsSlice.actions;
export default adminProductsSlice.reducer;
