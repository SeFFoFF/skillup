import React, { useContext, useEffect, useState } from "react"
import { FirebaseContext } from "./FirebaseProvider"
import { useAuthState } from "react-firebase-hooks/auth"
import { doc, addDoc, setDoc, collection, orderBy, query, Timestamp } from "firebase/firestore"
import { MessageInput } from "./MessageInput"
import { ChatBlock } from "./ChatBlock"
import { useCollectionData } from "react-firebase-hooks/firestore"
import "../../../assets/css/messenger/mainBlock.css"

export const MainBlock = () => {
    const [messageValue, setMessageValue] = useState("")

    const { auth, firestore, chat, chatInfo, setChatInfo } = useContext(FirebaseContext)
    const [user] = useAuthState(auth)

    const chatIdRef1 = user?.uid + chat?.uid
    const chatIdRef2 = chat?.uid + user?.uid

    const messagesRef1 = collection(firestore, "messages", chatIdRef1, "chat")
    const messagesRefByCreatedAt1 = query(messagesRef1, orderBy("createdAt"))
    const [messages1, loading1] = useCollectionData(messagesRefByCreatedAt1)

    const messagesRef2 = collection(firestore, "messages", chatIdRef2, "chat")
    const messagesRefByCreatedAt2 = query(messagesRef2, orderBy("createdAt"))
    const [messages2, loading2] = useCollectionData(messagesRefByCreatedAt2)

    const getChatInfo = () => {
        if (messages1?.length)
            return {
                chatId: chatIdRef1,
                messages: messages1,
                loading: loading1
            }
        else if (messages2?.length) {
            return {
                chatId: chatIdRef2,
                messages: messages2,
                loading: loading2
            }
        } else return null
    }

    useEffect(() => {
        setChatInfo(getChatInfo())
    }, [messages1, messages2])

    const sendMessage = async () => {
        if (chatInfo.messages?.length) {
            await addDoc(collection(firestore, "messages", chatInfo.chatId, "chat"), {
                sendFrom: user.uid,
                sendTo: chat.uid,
                text: messageValue,
                createdAt: Timestamp.fromDate(new Date())
            })
            await setDoc(doc(firestore, "lastMessage", chatInfo.chatId), {
                id: chatInfo.chatId,
                sendFrom: user.uid,
                sendTo: chat.uid,
                text: messageValue,
                createdAt: Timestamp.fromDate(new Date()),
                unread: true
            })
        } else {
            const chatId = user.uid + chat.uid

            await addDoc(collection(firestore, "messages", chatId, "chat"), {
                sendFrom: user.uid,
                sendTo: chat.uid,
                text: messageValue,
                createdAt: Timestamp.fromDate(new Date())
            })
            await setDoc(doc(firestore, "lastMessage", chatId), {
                id: chatInfo.chatId,
                sendFrom: user.uid,
                sendTo: chat.uid,
                text: messageValue,
                createdAt: Timestamp.fromDate(new Date()),
                unread: true
            })
        }

        setMessageValue("")
    }

    return (
        <div className="main-block">
            <ChatBlock/>
            {
                chat && <MessageInput messageValue={messageValue} setMessageValue={setMessageValue} sendMessage={sendMessage}/>
            }
        </div>
    )
}