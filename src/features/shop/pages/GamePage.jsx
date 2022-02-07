import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { GameTag, ImageCover } from "../components"
import "../../../assets/css/shop/gamePage.css"
import { deleteItemFromCart, setItemInCart } from "../../../redux/shop/cartReducer"

export const GamePage = () => {
    const dispatch = useDispatch()
    const game = useSelector(state => state.game.currentGame)
    const itemsInCart = useSelector(state => state.cart.itemsInCart)

    const isGameInCart = itemsInCart.some(item => item.id === game.id)

    const cartActionsHandler = (event) => {
        event.stopPropagation()

        if (isGameInCart) dispatch(deleteItemFromCart(game.id))
        else dispatch(setItemInCart(game))
    }

    const renderGameTags = () => {
        return game.tags.map((tag, index) => (
            <GameTag key={index} tag={tag}/>
        ))
    }

    return (
        <div className="game-block">
            <div className="game-block__row">
                <div className="game-block__column">
                    <h2 className="game-name">{ game.name }</h2>
                    <iframe
                        width="98%"
                        height="436px"
                        src={game.videoUrl}
                        title="Youtube Video Player"
                        frameBorder="0"
                        allowFullScreen
                    >
                    </iframe>
                </div>

                <div className="game-block__column">
                    <div>
                        <ImageCover imageUrl={game.imageUrl}/>
                        <p className="game-description">{ game.description }</p>
                        <div className="game-tags">
                            { game.tags && game.tags.length ? renderGameTags() : null }
                        </div>
                    </div>
                    <div className="game-block__buy-wrapper">
                        <p className="game-price">{ game.price }$</p>
                        <button
                            className="game-buy-button"
                            onClick={cartActionsHandler}
                        >
                            { isGameInCart ? "Убрать из корзины" : "В корзину"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}