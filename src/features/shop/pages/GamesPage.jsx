import React, { useEffect, useState } from "react"
import { gamesData } from "../../../constants/gamesData"
import { getUniqueTags } from "../../../utils"
import { GameCardsList, GamesFilter } from "../components"

export const GamesPage = () => {
    const [games, setGames] = useState(null)
    const [gameTags, setGameTags] = useState([])
    const [filter, setFilter] = useState([])

    useEffect(() => {
        setGames(gamesData)

        if (games) setGameTags(getUniqueTags(games))
    }, [games])

    return (
        <div className="games-page">
            <GamesFilter gameTags={gameTags} setFilter={setFilter}/>
            <GameCardsList games={games}/>
        </div>
    )
}