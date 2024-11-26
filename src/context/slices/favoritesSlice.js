import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const addFavoriteThunk = createAsyncThunk(
    'users/addFavorites',
    async ({userId, productId, token }, { rejectWithValue }) => {
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
        return {response: response.data, productId
        }
      } catch (error) {
        return rejectWithValue(error.response?.data?.mensaje || error.response?.data?.message)
      }
    }
  )

export const removeFavoriteThunk = createAsyncThunk(
    'users/deleteFavorites',
    async ({userId, productId, token }, { rejectWithValue }) => {
      try {
        const response = await axios.delete(`https://alluring-enchantment-production.up.railway.app/users/${userId}/favorites/${productId}`,
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

  export const initializeFavorites = createAsyncThunk(
    'favorites/initialize',
    async (_, { getState }) => {
      const state = getState();
      const loggedUserFavorites = state.loggedUser?.autosFavoritos || []; // Usa un selector si es necesario
      return loggedUserFavorites;
    }
  )

export const favoritesSlice = createSlice({
    name: 'favorites',
    initialState: {
        favorites: [], // acá podría traer desde LoggedUser los favs registrados
        success: false,
        loading: false,
        error: null
    },
    reducers: {
        modifyFavs: (state, action) => {
            if (state.favorites?.some((fav) => fav.id === action.payload.id))
            {   
                state.favorites = state.favorites.filter(
                    (fav) => fav.id !== action.payload.id)
            } 
            else {
                state.favorites.push(action.payload)
            }
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
        }) // removeFavorites
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
          // inicializando favoritos
          .addCase(initializeFavorites.fulfilled, (state, action) => {
            state.favorites = action.payload // Actualiza con los favoritos iniciales
          })
    }
})

export const { modifyFavs } = favoritesSlice.actions

export default favoritesSlice.reducer