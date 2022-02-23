import React, { useContext, useState } from "react"
import { FirebaseContext } from "../components"
import { useAuthState } from "react-firebase-hooks/auth"
import { useCollectionData } from "react-firebase-hooks/firestore"
import { collection, serverTimestamp, addDoc, query, orderBy } from "firebase/firestore"
import { Loader } from "../../../shared"
import "../../../assets/css/messenger/chatPage.css"

export const Chat = () => {
    const [value, setValue] = useState("")

    const { auth, firestore } = useContext(FirebaseContext)
    const [user] = useAuthState(auth)

    const messagesRef = collection(firestore, "messages")
    const messagesRefByCreatedAt = query(messagesRef, orderBy("createdAt"))

    const [messages, loading] = useCollectionData(messagesRefByCreatedAt)

    const sendMessage = async () => {
        await addDoc(messagesRef, {
            uid: user.uid,
            displayName: user.displayName,
            photoUrl: user.photoURL,
            text: value,
            createdAt: serverTimestamp()
        })
        setValue("")
    }

    // TODO create messagesList and message components
    const renderMessages = () => {
        return messages.map((message, index) => {
            const isUserSender = user.uid === message?.uid

            return <div key={index} className={isUserSender ? "message your-message" : "message"} >
                <h6>{message.displayName}</h6>
                <p>{message.text}</p>
            </div>

        })
    }

    return (
        <div className="chat-page">

            <div className="chat-page__left-side">

            </div>

            <div className="chat-page__main">

                <div className="main__chat-block">
                    {
                        loading ? <Loader/> : renderMessages()
                    }
                </div>

                <div className="main__input-block">
                    <input type="text" value={value} onChange={e => setValue(e.target.value)}/>
                    <button onClick={sendMessage}>send</button>
                </div>

            </div>
        </div>
    )
}