import React from "react"
import { Sidebar } from "../../../shared/Sidebar"
import { Header } from "./Header"
import { MessengerRouter } from "./MessengerRouter"
import "../../../assets/css/messenger/messengerLayout.css"

export const MessengerLayout = () => {
    return (
        <div className="messenger">
            <Sidebar/>
            <div className="layout-container">
                <Header/>
                <MessengerRouter/>
            </div>
        </div>
    )
}