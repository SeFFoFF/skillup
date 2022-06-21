import React, { useContext } from "react"
import { Sidebar } from "../../../shared/Sidebar"
import { Header } from "./Header"
import { MessengerRouter } from "./MessengerRouter"
import "../../../assets/css/messenger/messengerLayout.css"
import { FirebaseContext } from "./FirebaseProvider"
import { useAuthState } from "react-firebase-hooks/auth"
import { Loader } from "../../../shared"

export const MessengerLayout = () => {
    const { auth } = useContext(FirebaseContext)
    const [user, loading, error] = useAuthState(auth)

    return (
        <div className="messenger">
            <Sidebar/>
            <div className="layout-container">
                <Header/>
                {
                    loading ? <Loader/> : <MessengerRouter/>
                }
            </div>
        </div>
    )
}