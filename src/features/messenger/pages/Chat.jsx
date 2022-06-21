import React from "react"
import { LeftSidebar, MainBlock } from "../components"
import "../../../assets/css/messenger/chat.css"

export const Chat = () => {

    return (
        <div className="messenger-body">
            <LeftSidebar/>
            <MainBlock/>
        </div>
    )
}