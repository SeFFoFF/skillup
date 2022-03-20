import React from "react"
import "../../../assets/css/messenger/notificationModal.css"

export const NotificationModal = ({ user, setActive }) => {

    // TODO
    console.log(user)

    return (
        <div className="notification-modal" onClick={() => setActive(false)}>
            <div className="notification-modal__content" onClick={e => e.stopPropagation()}>
                test
            </div>
        </div>
    )
}