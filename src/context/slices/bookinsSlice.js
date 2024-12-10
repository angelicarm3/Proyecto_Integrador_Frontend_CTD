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

export const sendConfirmationEmailThunk = createAsyncThunk(
  'mail/send',
  async (emailConfig, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        'https://alluring-enchantment-production.up.railway.app/mail/send/message/reservation', emailConfig
      )
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
    bookinsByProduct: [],
    emailConfig: {
      toUser: [],
      subject: 'Gracias por tu reserva en Royal Ride',
      name: '',
      message: 'https://wa.me/+573143899603',
      logo: 'https://tiny.one/37xv75fb',
      details: {
        modelo: '',
        matricula: '',
        salida: [],
        retorno: [],
        dias: '',
        precio: ''
      }
    },
    success: false,
    loading: false,
    error: null
  },
  reducers: {
    getBookinsByProductId: (state, action) => {
      state.bookinsByProduct = state.bookins.filter(
        bookin => bookin.auto.id === action.payload).map(item => ({
        fechaInicio: item.fechaInicio,
        fechaFin: item.fechaFin
      }))
    }
  },
  extraReducers: (builder) => {
    builder
      // addFavorites
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

      // send email
      .addCase(sendConfirmationEmailThunk.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(sendConfirmationEmailThunk.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
      })
      .addCase(sendConfirmationEmailThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || 'Error al enviar datos'
      })
  }
})

export const { getBookinsByProductId } = bookinsSlice.actions

export default bookinsSlice.reducer
