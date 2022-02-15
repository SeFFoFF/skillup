import React, { useEffect, useState } from "react"
import { getUniqueTags, getFilteredGamesByTags, getAllGames } from "../../../utils"
import { GameCardsList, GamesFilter } from "../components"

export const GamesPage = () => {
    const [games, setGames] = useState([])
    const [filteredGames, setFilteredGames] = useState([])
    const [gameTags, setGameTags] = useState([])
    const [filter, setFilter] = useState({})

    useEffect(() => {
        getAllGames().then(data => setGames(data))

        if (games) setGameTags(getUniqueTags(games))
    }, [games.length])

    useEffect(() => {
        setFilteredGames(getFilteredGamesByTags(games, filter.byTags))
    }, [filter, games.length])

    return (
        <div className="games-page">
            <GamesFilter gameTags={gameTags} setFilter={setFilter}/>
            <GameCardsList games={filteredGames}/>
        </div>
    )
}