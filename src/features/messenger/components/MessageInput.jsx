import React from "react"
import { AiOutlineSend } from "react-icons/ai"
import "../../../assets/css/messenger/messageInput.css"

export const MessageInput = ({ messageValue, setMessageValue, sendMessage }) => {
    return (
        <div className="message-input">
            <input type="text" value={messageValue} onChange={e => setMessageValue(e.target.value)} placeholder="Message"/>
            <button onClick={sendMessage} disabled={!messageValue} className={messageValue ? "send-button send-button--pointer" : "send-button"}>
                <AiOutlineSend size={20}/>
            </button>
        </div>
    )
}