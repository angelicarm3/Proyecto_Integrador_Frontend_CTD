// adminUserSlice.js

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchAllUsersAdminThunk = createAsyncThunk(
  'adminUsers/fetchAllUsersAdmin',
  async (_, { dispatch }) => {
    const response = await axios.get('https://yourapi.com/users') // Cambia la URL
    return response.data
  }
)

export const deleteUserThunk = createAsyncThunk(
  'adminUsers/deleteUser',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`https://yourapi.com/users/${userId}`)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data.message)
    }
  }
)

export const adminUserSlice = createSlice({
  name: 'adminUsers',
  initialState: {
    users: [],
    loading: false,
    error: null,
    success: false,
    itemsToShow: 10,
    currentPage: 1,
    selectedUser: null,
  },
  reducers: {
    setItemsToShow: (state, action) => {
      state.itemsToShow = action.payload
      state.currentPage = 1
    },
    setPage: (state, action) => {
      state.currentPage = action.payload
    },
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload
    },
    resetStatus: (state) => {
      state.loading = false
      state.error = null
      state.success = false
      state.selectedUser = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUsersAdminThunk.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchAllUsersAdminThunk.fulfilled, (state, action) => {
        state.users = action.payload
        state.loading = false
      })
      .addCase(fetchAllUsersAdminThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || 'Error al obtener usuarios'
      })
      .addCase(deleteUserThunk.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(deleteUserThunk.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.users = state.users.filter(user => user.id !== action.meta.arg)
      })
      .addCase(deleteUserThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || 'Error al eliminar usuario'
      })
  },
})

export const { setItemsToShow, setPage, setSelectedUser, resetStatus } = adminUserSlice.actions
export default adminUserSlice.reducer
