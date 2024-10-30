import { createSlice } from '@reduxjs/toolkit';
import { productsData } from '../../data/products';

export const adminProductsSlice = createSlice({
  name: 'adminProducts',
  initialState: {
    allProducts: productsData.products,
    itemCount: 10,
    currentPage: 1,
    options: [10, 20, 30, 40, 50]

  },
  reducers: {
    setItemCount: (state, action) => {
      state.itemCount = action.payload;
      state.currentPage = 1
    },
    changePage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
});

export const { setItemCount, changePage } = adminProductsSlice.actions;
export default adminProductsSlice.reducer;
