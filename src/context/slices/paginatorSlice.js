import { createSlice } from '@reduxjs/toolkit'

export const paginatorSlice = createSlice({
  name: 'paginator',
  initialState: {
    page: 0,
    pageData: [],
    pageCount: 0,
    n: window.innerWidth < 640 ? 3 : (window.innerWidth > 640 && window.innerWidth <= 768) ? 6 : 9
  },

  reducers: {
    filterData: (state, action) => {
      state.pageData = action.payload?.filter((product, index) => (
        (index >= state.page * state.n) & (index < (state.page + 1) * state.n)
      ))
      state.pageCount = Math.ceil(action.payload?.length / state.n)
    },
    changePage: (state, action) => {
      console.log(action.payload)
      state.page = action.payload
    }
  }
})

export const { filterData, changePage } = paginatorSlice.actions

export default paginatorSlice.reducer
