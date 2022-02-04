import React from "react"
import "../../../assets/css/shop/gameCard/gameCardsList.css"
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
            { games && games.length ? renderGameCards() : <p>No games yet</p> }
        </div>
    )
}