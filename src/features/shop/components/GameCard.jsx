import React from "react"
import "../../../assets/css/shop/gameCard/gameCard.css"
import { ImageCover } from "./ImageCover"
import { GameTag } from "./GameTag"

export const GameCard = ({ name, tags, price, imageUrl }) => {

    const renderGameTags = () => {
        return tags.map((tag, index) => (
            <GameTag key={index} tag={tag}/>
        ))
    }

    return (
        <div className="game-card">
            <ImageCover imageUrl={ imageUrl }/>
            <div className="game-card__details">
                <h2 className="game-card__name">{ name }</h2>
                <div className="game-card__tags">
                    { tags && tags.length ? renderGameTags() : "" }
                </div>
                <div className="game-card__buy-wrapper">
                    <p className="game-card__price">{ price }</p>
                    <button className="game-card__button">В корзину</button>
                </div>
            </div>
        </div>
    )
}