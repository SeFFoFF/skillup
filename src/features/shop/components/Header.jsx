import React from "react"
import "../../../assets/css/shop/header/header.css"
import { Link } from "react-router-dom"
import { IconCart } from "./IconCart"

export const Header = () => {
    return (
        <header className="shop-header">
            <Link to="/shop" className="shop-header__title">Game shop</Link>
            <IconCart/>
        </header>
    )
}