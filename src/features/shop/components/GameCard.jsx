import React from "react"
import "../../../assets/css/shop/gameCard/gameCard.css"
import { ImageCover } from "./ImageCover"
import { GameTag } from "./GameTag"
import { useDispatch } from "react-redux"
import { setItemInCart } from "../../../redux/shop/reducers/cartReducer"

export const GameCard = ({ game }) => {
    const dispatch = useDispatch()

    const renderGameTags = () => {
        return game.tags.map((tag, index) => (
            <GameTag key={index} tag={tag}/>
        ))
    }

    const addGameToCartHandler = (event) => {
        event.stopPropagation()
        dispatch(setItemInCart(game))
    }

    return (
        <div className="game-card">
            <ImageCover imageUrl={ game.imageUrl }/>
            <div className="game-card__details">
                <h2 className="game-card__name">{ game.name }</h2>
                <div className="game-card__tags">
                    { game.tags && game.tags.length ? renderGameTags() : "" }
                </div>
                <div className="game-card__buy-wrapper">
                    <p className="game-card__price">{ game.price }</p>
                    <button
                        className="game-card__button"
                        onClick={addGameToCartHandler}
                    >В корзину</button>
                </div>
            </div>
        </div>
    )
}