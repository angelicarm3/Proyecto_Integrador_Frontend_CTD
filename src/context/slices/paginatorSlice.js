import { createSlice } from '@reduxjs/toolkit'

const page = window.location.pathname

const initialState = {
  page: 0,
  items: [],
  pageCount: 0,
  itemsToShow: 10,
  startIndex: 0,
  endIndex: 0,
  n: page === '/' ? (window.innerWidth < 640 ? 3 : (window.innerWidth > 640 && window.innerWidth <= 768) ? 6 : 8) : 10
}

export const paginatorSlice = createSlice({
  name: 'paginator',
  initialState,

  reducers: {
    filterData: (state, action) => {
      state.items = action.payload?.filter((product, index) => (
        (index >= state.page * state.n) & (index < (state.page + 1) * state.n)
      ))
      state.pageCount = Math.ceil(action.payload?.length / state.n)
      state.startIndex = state.page * state.n
      state.endIndex = (state.page + 1) * state.n
    },
    changePage: (state, action) => {
      state.page = action.payload
    },
    changeItemsToShow: (state, action) => {
      state.n = action.payload
      state.itemsToShow = action.payload
    },
    resetPagination: (state) => {
      return initialState
    }
  }
})

export const { filterData, changePage, changeItemsToShow, resetPagination } = paginatorSlice.actions

export default paginatorSlice.reducer
