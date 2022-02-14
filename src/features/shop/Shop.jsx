import React from "react"
import "../../assets/css/shop/shop.css"
import { Layout, ThemeProvider } from "./components"

export const Shop = () => {
    return (
        <ThemeProvider>
            <Layout className="shop"/>
        </ThemeProvider>
    )
}
