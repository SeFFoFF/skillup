import React from "react"
import "../../../assets/css/shop/header/cart.css"
import { TiShoppingCart } from "react-icons/ti"

export const Cart = () => {
    return (
        <div className="header-cart">
            <TiShoppingCart size={25} className="header-cart__icon"/>
            <span className="header-cart__total-price">50$</span>
        </div>
    )
}
