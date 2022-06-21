import React, { useEffect } from "react"
import { AiOutlineSend } from "react-icons/ai"
import "../../../assets/css/messenger/messageInput.css"

export const MessageInput = ({ messageValue, setMessageValue, sendMessage }) => {
    useEffect(() => {
        const listener = async (event) => {
            if (messageValue.length && (event.code === "Enter" || event.code === "NumpadEnter")) {
                await sendMessage()
            }
        }

        document.addEventListener("keydown", listener)

        return () => {
            document.removeEventListener("keydown", listener)
        }
    }, [messageValue.length])

    return (
        <div className="message-input">
            <input type="text" value={messageValue} onChange={e => setMessageValue(e.target.value)} placeholder="Message"/>
            <button onClick={sendMessage} disabled={!messageValue} className={messageValue ? "send-button send-button--pointer" : "send-button"}>
                <AiOutlineSend size={20}/>
            </button>
        </div>
    )
}