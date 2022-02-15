import React, { useEffect, useState } from "react"
import { getUniqueTags, getFilteredGamesByTags, getAllGames } from "../../../utils"
import { GameCardsList, GamesFilter, Loader } from "../components"

export const GamesPage = () => {
    const [games, setGames] = useState([])
    const [filteredGames, setFilteredGames] = useState([])
    const [gameTags, setGameTags] = useState([])
    const [filter, setFilter] = useState({})
    const [showLoader, setShowLoader] = useState(true)

    useEffect(() => {
        getAllGames().then(data => setGames(data))

        if (games) {
            setShowLoader(false)
            setGameTags(getUniqueTags(games))
        } else setShowLoader(true)
    }, [games.length])

    useEffect(() => {
        setFilteredGames(getFilteredGamesByTags(games, filter.byTags))
    }, [filter, games.length])

    return (
        <div className="games-page">
            <GamesFilter gameTags={gameTags} setFilter={setFilter}/>
            {
                showLoader ? <Loader/> : <GameCardsList games={filteredGames}/>
            }
        </div>
    )
}