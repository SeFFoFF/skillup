import React from "react"
import "../../../assets/css/messenger/userItem.css"

export const UserItem = ({ user, isFriend = true }) => {
    return (
        <div className="user-item">
            <img className="user-image" src={user?.photoUrl} alt=""/>
            <div className="user-info">
                <p className="user-info__name">{ user?.displayName }</p>
                {
                    isFriend && <p className="user-info__last-message">Lorem ipsum dolor. Lorem ipsum dolor. Lorem ipsum dolor.</p>
                }
            </div>
        </div>
    )
}