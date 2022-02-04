import React from "react"
import "../../../assets/css/shop/header/cart.css"

export const Cart = ({ games, onClick }) => {
    const totalPrice = games.reduce((acc, item) => acc += item.price, 0)

    const renderGamesList = () => {
        return games.map(game => (
            <div key={game.id} className="cart__game-item">
                <p>{game.name}</p>
                <p>{game.price}$</p>
            </div>
        ))
    }

    return (
        <div className="cart">
            <div className="cart__games-list">
                { renderGamesList() }
            </div>
            {
                games.length ?
                    <div className="cart__total-price">
                        <span>Итого: { totalPrice }$</span>
                        <button className="cart__order-button">Оформить заказ</button>
                    </div>
                    :
                    <p className="cart__empty">Корзина пуста</p>
            }
        </div>
    )
}