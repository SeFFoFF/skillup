import React from "react"
import "../../assets/css/shop/shop.css"
import { Header } from "./components"
import { Route, Routes } from "react-router-dom"
import { GamePage, GamesPage } from "./pages"

export const Shop = () => {
    return (
        <div className="shop">
            <Header/>

            <Routes>
                <Route path="/" element={<GamesPage/>}/>
                <Route path=":gameName" element={<GamePage/>}/>
                <Route path="/*" element={<h2>404</h2>}/>
            </Routes>
        </div>
    )
}
