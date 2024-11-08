// formSlice.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import handleFileUpload from '../../service/fileUploadService'
import axios from 'axios'

export const uploadImagesThunk = createAsyncThunk(
  'form/uploadImages',
  async ({ files, form }, { rejectWithValue }) => {
    try {
      const urls = await handleFileUpload(files)
      return { urls, form }
    } catch (error) {
      return rejectWithValue('Error al subir archivos')
    }
  }
)

export const submitFormThunk = createAsyncThunk(
  'form/submitForm',
  async ({ formData, formURL }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`https://alluring-enchantment-production.up.railway.app/${formURL}`, formData)
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
  productData: {
    marca: '',
    modelo: '',
    matricula: '',
    fechaFabricacion: '',
    potenciaHP: '',
    velocidad: '',
    aceleracion: '',
    precioDia: '',
    categorias: [],
    caracteristicas: [],
    descripcion: '',
    imagenes: []
  },
  loading: false,
  error: null,
  success: false,
  imgSuccess: false,
  hasSubmited: false
}

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    updateField: (state, action) => {
      let newValue
      const { field, value, form } = action.payload
      if (form === 'createProduct') {
        if (field === 'marca' || field === 'modelo') {
          newValue = capitalizeFirstLetter(value)
          state.productData[field] = newValue
        } else {
          state.productData[field] = value
        }
      }
    },
    updateHasSubmited: (state) => {
      state.hasSubmited = !state.hasSubmited
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
        state.loading = true
        state.error = null
      })
      .addCase(uploadImagesThunk.fulfilled, (state, action) => {
        const { urls, form } = action.payload
        const newURLs = urls.map((url, index) => ({
          url,
          esPrincipal: index === 0
        }))
        if (form === 'createProduct') {
          state.productData.imagenes = newURLs
        }
        state.imgSuccess = true
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
        state.imgSuccess = false
      })
  }
})

export const { updateField, clearError, resetForm, updateHasSubmited } = formSlice.actions
export default formSlice.reducer
