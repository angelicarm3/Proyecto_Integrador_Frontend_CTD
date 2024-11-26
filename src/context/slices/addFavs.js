import { createSlice } from "@reduxjs/toolkit";


export const addFavsSlice = createSlice({
    name: 'addFavs',
    initialState: {
        isFav: false,
        favorites: [], // acá podría traer desde LoggedUser los favs registrados
        favProducts: []
    },
    reducers: {
        addFav: (state, action) => {
            if (!state.favorites.includes(action.payload.id))
            {
                state.favorites = [...state.favorites, action.payload.id]
                state.favProducts = [...state.favProducts, action.payload]
                console.log("favProducts añadido:" + state.favProducts)
            }
        },
        removeFav: (state, action) => {
            if (state.favorites.includes(action.payload.id))
                {
                    state.favorites = state.favorites.filter((filtered) => filtered !== action.payload.id)
                    state.favProducts = state.favProducts.filter((filtered) => filtered.id !== action.payload.id)
                    console.log("favProduc Borrado" + state.favProducts)
                }
        }
    }
})

export const { addFav, removeFav } = addFavsSlice.actions;

export default addFavsSlice.reducer;