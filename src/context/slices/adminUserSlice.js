// En adminUserSlice.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// Función para asignar rol de administrador
export const assignAdminRole = createAsyncThunk(
  'adminUsers/assignAdminRole',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.put(`https://yourapi.com/users/${userId}/assign-admin`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Función para quitar rol de administrador
export const removeAdminRole = createAsyncThunk(
  'adminUsers/removeAdminRole',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.put(`https://yourapi.com/users/${userId}/remove-admin`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Función para eliminar usuario
export const deleteUserThunk = createAsyncThunk(
  'adminUsers/deleteUser',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`https://yourapi.com/users/${userId}`);
      return response.data; // Devuelve los datos del usuario eliminado
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Obtener todos los usuarios
export const fetchAllUsersAdminThunk = createAsyncThunk(
  'adminUsers/fetchAllUsersAdmin',
  async (_, { dispatch }) => {
    const response = await axios.get('https://yourapi.com/users');
    return response.data;
  }
);

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
      state.itemsToShow = action.payload;
      state.currentPage = 1;
    },
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
    resetStatus: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.selectedUser = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUsersAdminThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllUsersAdminThunk.fulfilled, (state, action) => {
        state.users = action.payload;
        state.loading = false;
      })
      .addCase(fetchAllUsersAdminThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Error al obtener usuarios';
      })
      .addCase(assignAdminRole.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(assignAdminRole.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.users.push(action.payload);
      })
      .addCase(assignAdminRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Error al asignar rol de administrador';
      })
      .addCase(removeAdminRole.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeAdminRole.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.users = state.users.filter(user => user.id !== action.meta.arg);
      })
      .addCase(removeAdminRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Error al quitar rol de administrador';
      })
      // Manejo de la acción deleteUserThunk
      .addCase(deleteUserThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUserThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.users = state.users.filter(user => user.id !== action.meta.arg); // Filtra el usuario eliminado
      })
      .addCase(deleteUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Error al eliminar usuario';
      });
  },
});

export const { setItemsToShow, setPage, setSelectedUser, resetStatus } = adminUserSlice.actions;
export default adminUserSlice.reducer;
