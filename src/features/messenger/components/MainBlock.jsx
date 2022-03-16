import React, { useContext, useState } from "react"
import { FirebaseContext } from "./FirebaseProvider"
import { useAuthState } from "react-firebase-hooks/auth"
import { addDoc, collection, serverTimestamp } from "firebase/firestore"
import { MessageInput } from "./MessageInput"
import { ChatBlock } from "./ChatBlock"
import "../../../assets/css/messenger/mainBlock.css"

export const MainBlock = () => {
    const [messageValue, setMessageValue] = useState("")

    const { auth, firestore } = useContext(FirebaseContext)
    const [user] = useAuthState(auth)

    const messagesRef = collection(firestore, "messages")

    const sendMessage = async () => {
        await addDoc(messagesRef, {
            uid: user.uid,
            displayName: user.displayName,
            photoUrl: user.photoURL,
            text: messageValue,
            createdAt: serverTimestamp()
        })
        setMessageValue("")
    }

    return (
        <div className="main-block">
            <ChatBlock/>
            <MessageInput messageValue={messageValue} setMessageValue={setMessageValue} sendMessage={sendMessage}/>
        </div>
    )
}