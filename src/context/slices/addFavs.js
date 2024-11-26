import { createSlice } from "@reduxjs/toolkit";


export const addFavsSlice = createSlice({
    name: 'addFavs',
    initialState: {
        isFav: false,
        favorites: [] // acá podría traer desde LoggedUser los favs registrados
    },
    reducers: {
        addFav: (state, action) => {
            if (!state.favorites.includes(action.payload))
            {
                state.favorites = [...state.favorites, action.payload]
                console.log(state.favorites)
            }
        },
        removeFav: (state, action) => {
            if (state.favorites.includes(action.payload))
                {
                    state.favorites = state.favorites.filter((filtered) => filtered !== action.payload)
                }
        }
    }
})

export const { addFav, removeFav } = addFavsSlice.actions;

export default addFavsSlice.reducer;