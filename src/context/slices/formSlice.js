// formSlice.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import handleFileUpload from '../../service/uploadService'
import axios from 'axios'

export const uploadImagesThunk = createAsyncThunk(
  'form/uploadImages',
  async (files, { rejectWithValue }) => {
    try {
      const urls = await handleFileUpload(files)
      console.log(urls)
      return urls
    } catch (error) {
      return rejectWithValue('Error al subir archivos')
    }
  }
)

export const submitFormThunk = createAsyncThunk(
  'form/submitForm',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post('https://alluring-enchantment-production.up.railway.app/autos/register', formData)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data.mensaje)
    }
  }
)

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

const initialState = {
  data: {
    marca: '',
    modelo: '',
    matricula: '',
    fechaFabricacion: '',
    potenciaHP: '',
    velocidad: '',
    aceleracion: '',
    precioDia: '',
    categorias: [],
    descripcion: '',
    imagenes: []
  },
  loading: false,
  error: null,
  success: false
}

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    updateField: (state, action) => {
      let newValue
      const { field, value } = action.payload

      if (field === 'marca' || field === 'modelo') {
        newValue = capitalizeFirstLetter(value)
        state.data[field] = newValue
      } else {
        state.data[field] = value
      }
    },
    clearError: (state) => {
      state.error = null
    },
    resetForm: (state) => {
      return initialState
    }
  },
  extraReducers: (builder) => {
    builder
      // uploadImages
      .addCase(uploadImagesThunk.pending, (state) => {
        // state.loading = true
        state.error = null
      })
      .addCase(uploadImagesThunk.fulfilled, (state, action) => {
        state.data.imagenes = action.payload.map((url, index) => ({
          url,
          esPrincipal: index === 0
        }))
      })
      .addCase(uploadImagesThunk.rejected, (state, action) => {
        state.error = action.payload || 'Error al subir archivos'
      })

    // submitForm
      .addCase(submitFormThunk.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(submitFormThunk.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
      })
      .addCase(submitFormThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || 'Error al enviar datos'
      })
  }
})

export const { updateField, clearError, resetForm } = formSlice.actions
export default formSlice.reducer
