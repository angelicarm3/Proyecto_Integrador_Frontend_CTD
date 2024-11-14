import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

// Función para asignar rol de administrador
export const modifiedAdminRole = createAsyncThunk(
  'adminUsers/modifiedAdminRole',
  async ({ userId, token, userData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `https://alluring-enchantment-production.up.railway.app/users/update/privilege/${userId}`,
        userData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data.message)
    }
  }
)

// Función para eliminar usuario
export const deleteUserThunk = createAsyncThunk(
  'adminUsers/deleteUser',
  async ({ userId, token }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `https://alluring-enchantment-production.up.railway.app/users/delete/${userId}`,
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

// Obtener todos los usuarios
export const fetchAllUsersAdminThunk = createAsyncThunk(
  'adminUsers/fetchAllUsersAdmin',
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        'https://alluring-enchantment-production.up.railway.app/users/list',
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.mensaje || error.response?.data?.message)
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
    selectedUser: {}
  },
  reducers: {
    setItemsToShow: (state, action) => {
      state.itemsToShow = action.payload
      state.currentPage = 1 // Reiniciar la página cuando cambia el número de items
    },
    setPage: (state, action) => {
      state.currentPage = action.payload
    },
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload
    },
    resetStatus: (state) => {
      state.users = []
      state.loading = false
      state.error = null
      state.success = false
      state.selectedUser = {}
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch users
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

    // Modify admin privileges
      .addCase(modifiedAdminRole.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(modifiedAdminRole.fulfilled, (state, action) => {
        const updatedUser = state.users.find((user) => user.id === action.payload.id)
        if (updatedUser) {
          updatedUser.esAdmin = action.payload.esAdmin
        }
        state.loading = false
      })
      .addCase(modifiedAdminRole.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || 'Error al modificar permisos'
      })

      // Eliminar usuario
      .addCase(deleteUserThunk.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(deleteUserThunk.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user.id !== action.payload.id)
        state.loading = false
        state.success = true
      })
      .addCase(deleteUserThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || 'Error al modificar permisos'
      })
  }
})

export const { setItemsToShow, setPage, setSelectedUser, resetStatus } = adminUserSlice.actions

export default adminUserSlice.reducer
