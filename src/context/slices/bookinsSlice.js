import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchAllBookinsThunk = createAsyncThunk(
  'reservations/fetchAllBookins',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('https://alluring-enchantment-production.up.railway.app/reservations/list')
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.mensaje || error.response?.data?.message)
    }
  }
)

export const fetchBookinsByIdThunk = createAsyncThunk(
  'bookins/fetchBookinsById',
  async ({ userId, token}, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://alluring-enchantment-production.up.railway.app/reservations/find/byuser/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      return response.data
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.mensaje || error.response?.data?.message || 'Error al obtener reservas'
      )
    }
  }
)

export const deleteBookinThunk = createAsyncThunk(
  'bookins/deleteBookin',
  async ({ id, token }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `https://alluring-enchantment-production.up.railway.app/reservations/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.mensaje || error.response?.data?.message)
    }
  }
)

export const bookinsSlice = createSlice({
  name: 'bookins',
  initialState: {
    bookins: [],
    bookinsByUser:[],
    bookinsByProduct: [],
    totalBookinsByUser: 0,
    success: false,
    loading: false,
    error: null
  },
  reducers: {
    setSelectedBookin: (state, action) => {
      state.selectedBookin = action.payload
    },

    getBookinsByProductId: (state, action) => {
      state.bookinsByProduct = state.bookins.filter(
        bookin => bookin.auto.id === action.payload).map(item => ({
        fechaInicio: item.fechaInicio,
        fechaFin: item.fechaFin
      }))
    },
    resetStatus: (state) => {
      state.loading = false
      state.error = null
      state.success = false
      state.selectedUser = {}
    }
  },
  
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllBookinsThunk.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchAllBookinsThunk.fulfilled, (state, action) => {
        state.bookins = action.payload
        state.loading = false
      })
      .addCase(fetchAllBookinsThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || 'Error al enviar datos'
      })
      .addCase(fetchBookinsByIdThunk.pending, (state) => {
        state.loading = true
        state.error = null
        state.success = false
      })
      .addCase(fetchBookinsByIdThunk.fulfilled, (state, action) => {
        state.bookinsByUser = action.payload
        state.totalBookinsByUser = state.bookinsByUser.length
        state.loading = false
        state.success = true
      })
      .addCase(fetchBookinsByIdThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || 'Error al obtener las reservas'
        state.success = false
      })
      .addCase(deleteBookinThunk.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(deleteBookinThunk.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
      })
      .addCase(deleteBookinThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || 'Error al modificar permisos'
      })
  }
})

export const { getBookinsByProductId, setSelectedBookin, resetStatus } = bookinsSlice.actions

export default bookinsSlice.reducer
