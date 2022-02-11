import React, { useEffect, useState } from "react"
import "../../../assets/css/shop/gamesFilter.css"
import { GameTag } from "./GameTag"

export const GamesFilter = ({ gameTags, setFilter }) => {
    const [filterTags, setFilterTags] = useState([])

    useEffect(() => {
        console.log(filterTags)
        // setFilter(filterTags) TODO filter array
    }, [filterTags])

    const onTagClickHandler = (tag) => {
        if (filterTags.includes(tag)) setFilterTags(filterTags.filter(item => item !== tag ))
        else setFilterTags([...filterTags, tag])
    }

    const renderGameTags = () => {
        return gameTags.map((tag, index) => (
            <GameTag key={index} tag={tag} onClick={onTagClickHandler}/>
        ))
    }

    return (
        <div className="games-filter">
            { gameTags ? renderGameTags() : null }
        </div>
    )
}