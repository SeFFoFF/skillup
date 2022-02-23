import React, { useContext } from "react"
import { Link } from "react-router-dom"
import { FirebaseContext } from "./FirebaseProvider"
import { useAuthState } from "react-firebase-hooks/auth"
import "../../../assets/css/messenger/header/header.css"

export const Header = () => {
    const { auth } = useContext(FirebaseContext)
    const [user] = useAuthState(auth)

    return (
        <header className="messenger-header">
            <Link to="/Messenger" className="messenger-header__title">Messenger</Link>
            {
                user &&
                    <div className="messenger-header__user-info">
                        <p>{ user.displayName }</p>
                        <button onClick={() => auth.signOut()}>Sign out</button>
                    </div>
            }
        </header>
    )
}