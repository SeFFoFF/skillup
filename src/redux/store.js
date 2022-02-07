import { configureStore } from "@reduxjs/toolkit"
import cartReducer from "./shop/cartReducer"
import gamesReducer from "./shop/gameReducer"

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        game: gamesReducer,
    },
})
