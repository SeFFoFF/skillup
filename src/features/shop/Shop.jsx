import React, { useEffect, useState } from "react"
import "../../assets/css/shop/shop.css"
import { GameCardsList, Header } from "./components"
import { gamesData } from "../../constants/gamesData"
import { Route, Routes } from "react-router-dom"
import { GamePage } from "./pages"

export const Shop = () => {
    const [games, setGames] = useState(null)

    useEffect(() => {
        setGames(gamesData)
    }, [])

    return (
        <div className="shop">
            <Header/>

            <Routes>
                <Route path="/" element={<GameCardsList games={games}/>}/>
                <Route path=":gameName" element={<GamePage/>}/>
                <Route path="/*" element={<h2>404</h2>}/>
            </Routes>
        </div>
    )
}
