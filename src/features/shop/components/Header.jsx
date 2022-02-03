import React from "react"
import "../../../assets/css/shop/header/header.css"
import { Link } from "react-router-dom"
import { Cart } from "./Cart"

export const Header = () => {
    return (
        <header className="shop-header">
            <Link to="/" className="shop-header__title">Game store</Link>

            <Cart/>
        </header>
    )
}