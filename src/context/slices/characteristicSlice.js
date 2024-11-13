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

// Thunk para borrar una característica por ID
export const deleteCharacteristicThunk = createAsyncThunk(
  'characteristics/delete',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`https://alluring-enchantment-production.up.railway.app/characteristics/delete/${id}`)
      return response.data
    } catch (error) {
      return rejectWithValue('Error al eliminar la característica')
    }
  }
)

// Thunk para editar una característica por ID
export const updateCharacteristicThunk = createAsyncThunk(
  'characteristics/update',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`https://alluring-enchantment-production.up.railway.app/characteristics/update/${id}`, data)
      return response.data
    } catch (error) {
      return rejectWithValue('Error al actualizar la característica')
    }
  }
)
// Thunk para registrar una nueva característica
export const registerCharacteristicThunk = createAsyncThunk(
  'characteristics/register',
  async (newCharacteristic, { rejectWithValue }) => {
    try {
      const response = await axios.post('https://alluring-enchantment-production.up.railway.app/characteristics/register', newCharacteristic)
      return response.data
    } catch (error) {
      return rejectWithValue('Error al registrar la característica')
    }
  }
)

export const characteristicSlice = createSlice({
  name: 'characteristic',
  initialState: {
    allCharacteristics: [],
    loading: false,
    error: null,
    success: false
  },

  reducers: {
    resetSuccess(state) {
      state.success = false
    }
  },
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
      // Delete a characteristic
      .addCase(deleteCharacteristicThunk.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(deleteCharacteristicThunk.fulfilled, (state, action) => {
        // Filtrar la característica eliminada del estado
        state.allCharacteristics = state.allCharacteristics.filter(
          (characteristic) => characteristic.id !== action.meta.arg
        )
        state.loading = false
        state.success = true
      })
      .addCase(deleteCharacteristicThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || 'Error al eliminar la característica'
      })

      // Register a new characteristic
      .addCase(registerCharacteristicThunk.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(registerCharacteristicThunk.fulfilled, (state, action) => {
        state.allCharacteristics.push(action.payload)
        state.loading = false
        state.success = true
      })
      .addCase(registerCharacteristicThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || 'Error al registrar la característica'
      })

      // Update a characteristic
      .addCase(updateCharacteristicThunk.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updateCharacteristicThunk.fulfilled, (state, action) => {
        // Actualiza la característica en el estado
        const updatedCharacteristic = action.payload
        const index = state.allCharacteristics.findIndex((characteristic) => characteristic.id === updatedCharacteristic.id)
        if (index !== -1) {
          state.allCharacteristics[index] = updatedCharacteristic
        }
        state.loading = false
      })
      .addCase(updateCharacteristicThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || 'Error al actualizar la característica'
      })
  }
})

export const { resetSuccess } = characteristicSlice.actions

export default characteristicSlice.reducer
