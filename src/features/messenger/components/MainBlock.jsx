import React, { useContext, useState } from "react"
import { FirebaseContext } from "./FirebaseProvider"
import { useAuthState } from "react-firebase-hooks/auth"
import { addDoc, collection, orderBy, query, Timestamp } from "firebase/firestore"
import { MessageInput } from "./MessageInput"
import { ChatBlock } from "./ChatBlock"
import { useCollectionData } from "react-firebase-hooks/firestore"
import "../../../assets/css/messenger/mainBlock.css"

export const MainBlock = () => {
    const [messageValue, setMessageValue] = useState("")

    const { auth, firestore, chat } = useContext(FirebaseContext)
    const [user] = useAuthState(auth)

    const chatIdRef1 = user?.uid + chat?.uid
    const chatIdRef2 = chat?.uid + user?.uid

    const messagesRef1 = collection(firestore, "messages", chatIdRef1, "chat")
    const messagesRefByCreatedAt1 = query(messagesRef1, orderBy("createdAt"))
    const [messages1, loading1] = useCollectionData(messagesRefByCreatedAt1)

    const messagesRef2 = collection(firestore, "messages", chatIdRef2, "chat")
    const messagesRefByCreatedAt2 = query(messagesRef2, orderBy("createdAt"))
    const [messages2, loading2] = useCollectionData(messagesRefByCreatedAt2)

    const messagesAndLoadingProps = {
        messages1: messages1,
        loading1: loading1,
        messages2: messages2,
        loading2: loading2
    }

    const sendMessage = async () => {
        if (messages1?.length) {
            await addDoc(collection(firestore, "messages", chatIdRef1, "chat"), {
                sendFrom: user.uid,
                sendTo: chat.uid,
                text: messageValue,
                createdAt: Timestamp.fromDate(new Date())
            })
        } else if (messages2?.length) {
            await addDoc(collection(firestore, "messages", chatIdRef2, "chat"), {
                sendFrom: user.uid,
                sendTo: chat.uid,
                text: messageValue,
                createdAt: Timestamp.fromDate(new Date())
            })
        } else {
            const chatId = user.uid + chat.uid

            await addDoc(collection(firestore, "messages", chatId, "chat"), {
                sendFrom: user.uid,
                sendTo: chat.uid,
                text: messageValue,
                createdAt: Timestamp.fromDate(new Date())
            })
        }

        setMessageValue("")
    }

    return (
        <div className="main-block">
            <ChatBlock messagesAndLoading={messagesAndLoadingProps}/>
            {
                chat && <MessageInput messageValue={messageValue} setMessageValue={setMessageValue} sendMessage={sendMessage}/>
            }
        </div>
    )
}