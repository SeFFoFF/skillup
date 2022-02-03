import React, { useEffect, useState } from "react"
import "../../assets/css/shop/shop.css"
import { GameCardsList, Header } from "./components"
import { gamesData } from "../../constants/gamesData"

export const Shop = () => {
    const [games, setGames] = useState(null)

    useEffect(() => {
        setGames(gamesData)
    }, [])

    return (
        <div className="shop">
            <Header/>
            <GameCardsList games={games}/>
        </div>
    )
}
