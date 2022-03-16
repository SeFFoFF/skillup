import React from "react"
import { UserItem } from "./UserItem"
import "../../../assets/css/messenger/friendsList.css"

export const FriendsList = () => {
    const friends = null

    return (
        <div className="friends-list">
            {
                friends ? <UserItem/> : <p>You have no friends :(</p>
            }
        </div>
    )
}