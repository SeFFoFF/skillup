import React from "react"
import "../../../assets/css/shop/gameCardsList.css"
import { GameCard } from "./GameCard"

export const GameCardsList = ({ games }) => {

    const renderGameCards = () => {
        return games.map(game => (
            <GameCard
                key={game.id}
                game={game}
            />
        ))
    }

    return (
        <div className="game-cards-list">
            { renderGameCards() }
        </div>
    )
}