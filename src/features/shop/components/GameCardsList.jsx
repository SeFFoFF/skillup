import React from "react"
import "../../../assets/css/shop/gameCard/gameCardsList.css"
import { Link } from "react-router-dom"
import { GameCard } from "./GameCard"

export const GameCardsList = ({ games }) => {

    const renderGameCards = () => {
        return games.map(game => (
            <Link key={game.id} to={`${game.name}`}>
                <GameCard
                    name={game.name}
                    tags={game.tags}
                    price={game.price}
                    imageUrl={game.imageUrl}
                />
            </Link>
        ))
    }

    return (
        <div className="game-cards-list">
            { games && games.length ? renderGameCards() : <p>No games yet</p> }
        </div>
    )
}