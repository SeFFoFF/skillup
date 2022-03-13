import React from "react"
import { convertTimeBySeconds } from "../../../utils"
import "../../../assets/css/messenger/message.css"

export const Message = ({ message, isUserSender }) => {
    return (
        <div className={isUserSender ? "message your-message" : "message"}>
            <div className={isUserSender ? "message-wrapper your-message-wrapper" : "message-wrapper"}>
                <h6 className="message__user-name">{ message.displayName }</h6>
                <div className="message__text-wrapper">
                    <p className="message__user-text">{ message.text }</p>
                    <p className="message__user-text-time">{ convertTimeBySeconds(message.createdAt?.seconds + 7200) }</p>
                </div>
            </div>
            <img className="message__user-image" src={message.photoUrl} alt=""/>
        </div>
    )
}