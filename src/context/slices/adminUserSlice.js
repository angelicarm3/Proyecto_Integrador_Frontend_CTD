import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';


export const assignAdminRole = createAsyncThunk(
  'adminUsers/assignAdminRole',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.put(`https://alluring-enchantment-production.up.railway.app/users/${userId}/assign-admin`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);


export const removeAdminRole = createAsyncThunk(
  'adminUsers/removeAdminRole',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.put(`https://alluring-enchantment-production.up.railway.app/users/${userId}/remove-admin`);
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
      const response = await axios.delete(`https://alluring-enchantment-production.up.railway.app/users/${userId}`);
      return response.data; 
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);


export const fetchAllUsersAdminThunk = createAsyncThunk(
  'adminUsers/fetchAllUsersAdmin',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('https://alluring-enchantment-production.up.railway.app/users/list');
      return response.data;
    } catch (error) {
      return rejectWithValue('Error al obtener los datos');
    }
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
      // Fetch users
      .addCase(fetchAllUsersAdminThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllUsersAdminThunk.fulfilled, (state, action) => {
        state.users = action.payload;
        state.selectedUser = null;
        state.loading = false;
      })
      .addCase(fetchAllUsersAdminThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Error al obtener usuarios';
      });

   
    builder.addCase(assignAdminRole.fulfilled, (state, action) => {
      const updatedUser = state.users.find((user) => user.id === action.payload.id);
      if (updatedUser) {
        updatedUser.esAdmin = 'admin';
      }
    });

    // Eliminar rol de admin
    builder.addCase(removeAdminRole.fulfilled, (state, action) => {
      const updatedUser = state.users.find((user) => user.id === action.payload.id);
      if (updatedUser) {
        updatedUser.esAdmin = 'user';
      }
    });

    // Eliminar usuario
    builder.addCase(deleteUserThunk.fulfilled, (state, action) => {
      state.users = state.users.filter((user) => user.id !== action.payload.id);
    });
  },
});

// Exportar acciones
export const { setItemsToShow, setPage, setSelectedUser, resetStatus } = adminUserSlice.actions;

// Exportar reducer
export default adminUserSlice.reducer;
