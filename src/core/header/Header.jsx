import React from "react"
import "../../assets/css/header.css"

export const Header = () => {
    return (
        <header className="header">
            <nav className="header-nav">
                <ul className="header-list">
                    <a className="list-item">
                        <li>Home</li>
                    </a>
                    <a className="list-item">
                        <li>Shop</li>
                    </a>
                    <a className="list-item">
                        <li>About us</li>
                    </a>
                </ul>
            </nav>
        </header>
    )
}
