import React, { useEffect, useState } from "react"
import { gamesData } from "../../../constants/gamesData"
import { getUniqueTags, getFilteredGamesByTags } from "../../../utils"
import { GameCardsList, GamesFilter } from "../components"

export const GamesPage = () => {
    const [games, setGames] = useState([])
    const [filteredGames, setFilteredGames] = useState([])
    const [gameTags, setGameTags] = useState([])
    const [filter, setFilter] = useState({})

    useEffect(() => {
        setGames(gamesData)

        if (games) setGameTags(getUniqueTags(games))
    }, [games])

    useEffect(() => {
        setFilteredGames(getFilteredGamesByTags(games, filter.byTags))
    }, [filter])

    return (
        <div className="games-page">
            <GamesFilter gameTags={gameTags} setFilter={setFilter}/>
            <GameCardsList games={filteredGames}/>
        </div>
    )
}