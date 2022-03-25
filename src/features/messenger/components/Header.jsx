import React, { useContext } from "react"
import { Link } from "react-router-dom"
import { FirebaseContext } from "./FirebaseProvider"
import { useAuthState } from "react-firebase-hooks/auth"
import { IoLogOutOutline } from "react-icons/io5"
import "../../../assets/css/messenger/header/header.css"

export const Header = () => {
    const { auth, setChat } = useContext(FirebaseContext)
    const [user] = useAuthState(auth)

    const signOutHandler = () => {
        setChat(null)
        auth.signOut()
    }

    return (
        <header className="messenger-header">
            <Link to="/Messenger" className="messenger-header__title">Messenger</Link>
            {
                user && <IoLogOutOutline size={25} className="user-info__logout" onClick={signOutHandler}/>
            }
        </header>
    )
}