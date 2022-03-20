import React from "react"
import { BsBell } from "react-icons/bs"
import "../../../assets/css/messenger/notificationIcon.css"

export const NotificationIcon = ({ setActive }) => {

    // TODO
    const notifications = []

    return (
        <div className="notification-icon-wrapper" onClick={() => setActive(true)}>
            {
                notifications && notifications.length > 0 && <div className="notifications">{ notifications.length }</div>
            }
            <BsBell size={20}/>
        </div>
    )
}