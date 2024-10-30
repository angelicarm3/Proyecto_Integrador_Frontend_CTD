import { createSlice } from '@reduxjs/toolkit';

export const paginationSlice = createSlice({
  name: 'pagination',
  initialState: {
    currentPage: 1,
    totalItems: 0,
    itemsPerPage: 10,
    pageCount: 0,
  },
  reducers: {
    setTotalItems: (state, action) => {
      state.totalItems = action.payload;
      state.pageCount = Math.ceil(state.totalItems / state.itemsPerPage);
    },
    changePage: (state, action) => {
      state.currentPage = action.payload;
    },
    setItemsPerPage: (state, action) => {
      state.itemsPerPage = action.payload;
      state.pageCount = Math.ceil(state.totalItems / state.itemsPerPage);
    },
  },
});

export const { setTotalItems, changePage, setItemsPerPage } = paginationSlice.actions;

export default paginationSlice.reducer;
