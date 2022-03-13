import React from "react"

export const Message = ({ message, isUserSender }) => {
    return (
        <div className={isUserSender ? "message your-message" : "message"} >
            <h6>{message.displayName}</h6>
            <p>{message.text}</p>
        </div>
    )
}