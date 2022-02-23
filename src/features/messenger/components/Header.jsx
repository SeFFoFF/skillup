import React from "react"
import { Link } from "react-router-dom"
import "../../../assets/css/messenger/header/header.css"

export const Header = () => {
    return (
        <header className="messenger-header">
            <Link to="/Messenger" className="messenger-header__title">Messenger</Link>
            {/*<button>log out</button>*/}
        </header>
    )
}