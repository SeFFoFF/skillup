import React, { useState } from "react"
import "../../../assets/css/shop/header/iconCart.css"
import { TiShoppingCart } from "react-icons/ti"
import { useSelector } from "react-redux"
import { Cart } from "./Cart"

export const IconCart = () => {
    const [isCartShown, setIsCartShown] = useState(false)
    const games = useSelector(state => state.cart.itemsInCart)

    return (
        <div
            className="header-icon-cart__wrapper"
            onClick={() => setIsCartShown(!isCartShown)}
        >
            { games.length ? <div className="header-icon-cart__quantity">{games.length}</div> : null }
            <TiShoppingCart
                size={25}
                className="header-icon-cart"
            />
            { isCartShown && <Cart games={games} onClick={null}/> }
        </div>
    )
}
