import React, { useContext } from "react"
import { Link } from "react-router-dom"
import { FirebaseContext } from "./FirebaseProvider"
import { useAuthState } from "react-firebase-hooks/auth"
import { IoLogOutOutline } from "react-icons/io5"
import "../../../assets/css/messenger/header/header.css"

export const Header = () => {
    const { auth } = useContext(FirebaseContext)
    const [user] = useAuthState(auth)

    return (
        <header className="messenger-header">
            <Link to="/Messenger" className="messenger-header__title">Messenger</Link>

            <div className="messenger-header__user-info">
                <img className="user-image" src={user?.photoURL} alt=""/>
                <p className="user-name">{ user?.displayName }</p>
            </div>

            {
                user && <IoLogOutOutline size={25} className="user-info__logout" onClick={() => auth.signOut()}/>
            }
        </header>
    )
}