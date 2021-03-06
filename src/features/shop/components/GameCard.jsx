import React from "react"
import "../../../assets/css/shop/gameCard/gameCard.css"
import { ImageCover } from "./ImageCover"
import { GameTag } from "./GameTag"
import { useDispatch, useSelector } from "react-redux"
import { deleteItemFromCart, setItemInCart } from "../../../redux/shop/cartReducer"
import { setCurrentGame } from "../../../redux/shop/gameReducer"
import { Link } from "react-router-dom"

export const GameCard = ({ game }) => {
    const dispatch = useDispatch()
    const itemsInCart = useSelector(state => state.cart.itemsInCart)

    const isGameInCart = itemsInCart.some(item => item.id === game.id)

    const renderGameTags = () => {
        return game.tags.map((tag, index) => (
            <GameTag key={index} tag={tag}/>
        ))
    }

    const cartActionsHandler = (event) => {
        event.stopPropagation()

        if (isGameInCart) dispatch(deleteItemFromCart(game.id))
        else dispatch(setItemInCart(game))
    }

    const toGamePageHandler = () => {
        dispatch(setCurrentGame(game))
    }

    return (
        <div className="game-card">
            <ImageCover imageUrl={ game.imageUrl }/>
            <div className="game-card__details">
                <Link to={game.name}>
                    <h2 className="game-card__name" onClick={toGamePageHandler}>{ game.name }</h2>
                </Link>
                <div className="game-card__tags">
                    { game.tags && game.tags.length ? renderGameTags() : null }
                </div>
                <div className="game-card__buy-wrapper">
                    <p className="game-card__price">{ game.price }$</p>
                    <button
                        className="game-card__button"
                        onClick={cartActionsHandler}
                    >
                        { isGameInCart ? "Убрать из корзины" : "В корзину"}
                    </button>
                </div>
            </div>
        </div>
    )
}