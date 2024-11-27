import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const addFavoriteThunk = createAsyncThunk(
  'users/addFavorites',
  async ({ userId, productId, token }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `https://alluring-enchantment-production.up.railway.app/users/${userId}/favorites/${productId}`,
        {},
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

export const removeFavoriteThunk = createAsyncThunk(
  'users/deleteFavorites',
  async ({ userId, productId, token }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `https://alluring-enchantment-production.up.railway.app/users/${userId}/favorites/${productId}`,
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

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    favorites: [],
    success: false,
    loading: false,
    error: null
  },
  reducers: {
    toggleFavorites: (state, action) => {
      const itemId = action.payload.id

      if (state.favorites.some((fav) => fav.id === itemId)) {
        state.favorites = state.favorites.filter((fav) => fav.id !== itemId)
      } else {
        state.favorites.push(action.payload)
      }
    },
    initializeFavorites: (state, action) => {
      state.favorites = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      // addFavorites
      .addCase(addFavoriteThunk.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(addFavoriteThunk.fulfilled, (state, action) => {
        state.favorites = action.payload.autosFavoritos
        state.loading = false
      })
      .addCase(addFavoriteThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || 'Error al enviar datos'
      })

      // removeFavorites
      .addCase(removeFavoriteThunk.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(removeFavoriteThunk.fulfilled, (state, action) => {
        state.favorites = action.payload.autosFavoritos
        state.loading = false
      })
      .addCase(removeFavoriteThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || 'Error al enviar datos'
      })
  }
})

export const { modifyFavs, initializeFavorites } = favoritesSlice.actions

export default favoritesSlice.reducer
