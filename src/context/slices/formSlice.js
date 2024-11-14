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
      return rejectWithValue(error.response?.data?.mensaje || 'Error desconocido')
    }
  }
)

export const submitFormThunk = createAsyncThunk(
  'form/submitForm',
  async ({ formData, formURL, token }, { rejectWithValue }) => {
    try {
      let response
      if (formURL.includes('update')) {
        response = await axios.put(
          `https://alluring-enchantment-production.up.railway.app/${formURL}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )
      } else {
        response = await axios.post(
          `https://alluring-enchantment-production.up.railway.app/${formURL}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )
      }
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.mensaje || 'Error desconocido')
    }
  }
)

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

const changeInputType = (showPassword) => {
  const passwordField = document.getElementById('password')
  showPassword ? passwordField.type = 'text' : passwordField.type = 'password'
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
  loginData: {
    userName: '',
    password: ''
  },
  characteristicData: {
    nombre: '',
    icono: ''
  },
  userData: {
    nombre: '',
    apellido: '',
    dni: '',
    edad: '',
    nacionalidad: '',
    telefono: '',
    email: '',
    userName: '',
    password: '',
    esAdmin: false,
    estaActivo: false
  },
  showPassword: false,
  isRememberMe: false,
  response: '',
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
      } else if (form === 'logIn') {
        state.loginData[field] = value
      } else if (form === 'createCharacteristic') {
        state.characteristicData[field] = value
      }
    },
    updateHasSubmited: (state) => {
      state.hasSubmited = !state.hasSubmited
    },
    updateImgSuccess: (state) => {
      state.imgSuccess = !state.imgSuccess
    },
    setShowPassword: (state) => {
      state.showPassword = !state.showPassword
      changeInputType(state.showPassword)
    },
    setIsRememberMe: (state) => {
      state.isRememberMe = !state.isRememberMe
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
        } else if (form === 'createCharacteristic') {
          state.characteristicData.icono = newURLs
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
        state.response = action.payload
      })
      .addCase(submitFormThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || 'Error al enviar datos'
        state.imgSuccess = false
      })
  }
})

export const { updateField, clearError, resetForm, updateHasSubmited, updateImgSuccess, setShowPassword, setIsRememberMe } = formSlice.actions
export default formSlice.reducer
