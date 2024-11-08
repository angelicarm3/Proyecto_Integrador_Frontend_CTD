import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchAllCharacteristicsThunk = createAsyncThunk(
  'characteristics/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('https://alluring-enchantment-production.up.railway.app/characteristics/list')
      return response.data
    } catch (error) {
      return rejectWithValue('Error al obtener los datos')
    }
  }
)

export const characteristicSlice = createSlice({
  name: 'characteristic',
  initialState: {
    allCharacteristics: [],
    loading: false,
    error: null
  },

  reducers: {},
  extraReducers: (builder) => {
    builder
    // categories
      .addCase(fetchAllCharacteristicsThunk.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchAllCharacteristicsThunk.fulfilled, (state, action) => {
        state.allCharacteristics = action.payload
        state.loading = false
      })
      .addCase(fetchAllCharacteristicsThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || 'Error al enviar datos'
      })
  }
})

export const {} = characteristicSlice.actions

export default characteristicSlice.reducer
