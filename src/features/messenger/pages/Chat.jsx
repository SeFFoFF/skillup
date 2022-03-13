import React, { useContext, useState, useRef, useEffect } from "react"
import { FirebaseContext, Message } from "../components"
import { useAuthState } from "react-firebase-hooks/auth"
import { useCollectionData } from "react-firebase-hooks/firestore"
import { collection, serverTimestamp, addDoc, query, orderBy } from "firebase/firestore"
import { Loader } from "../../../shared"
import { AiOutlineSend } from "react-icons/ai"
import "../../../assets/css/messenger/chatPage.css"

export const Chat = () => {
    const [value, setValue] = useState("")

    const scrollBlock = useRef(null)

    const { auth, firestore } = useContext(FirebaseContext)
    const [user] = useAuthState(auth)

    const messagesRef = collection(firestore, "messages")
    const messagesRefByCreatedAt = query(messagesRef, orderBy("createdAt"))

    const [messages, loading] = useCollectionData(messagesRefByCreatedAt)

    useEffect(() => {
        if (scrollBlock) {
            scrollBlock.current.addEventListener("DOMNodeInserted", event => {
                const { currentTarget: target } = event
                target.scroll({ top: target.scrollHeight, behavior: "smooth" })
            })
        }
        console.log(user)
    }, [])

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

    const renderMessages = () => {
        return messages?.map((message, index) => {
            const isUserSender = user?.uid === message?.uid

            return <Message key={index} message={message} isUserSender={isUserSender}/>
        })
    }

    return (
        <div className="chat-page">

            <div className="chat-page__left-side">

            </div>

            <div className="chat-page__main">

                <div className="main__chat-block" ref={scrollBlock}>
                    {
                        loading ? <Loader/> : renderMessages()
                    }
                </div>

                <div className="main__input-block">
                    <input type="text" value={value} onChange={e => setValue(e.target.value)} placeholder="Message"/>
                    <button onClick={sendMessage} disabled={!value} className={value ? "send-button send-button--pointer" : "send-button"}>
                        <AiOutlineSend size={20}/>
                    </button>
                </div>

            </div>
        </div>
    )
}