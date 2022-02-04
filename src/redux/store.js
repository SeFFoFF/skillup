import { configureStore } from "@reduxjs/toolkit"
import cartReducer from "./shop/cartReducer"

export const store = configureStore({
    reducer: {
        cart: cartReducer,
    },
})
