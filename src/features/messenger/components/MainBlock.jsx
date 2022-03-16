import React, { useContext, useEffect, useRef, useState } from "react"
import { Loader } from "../../../shared"
import { FirebaseContext } from "./FirebaseProvider"
import { useAuthState } from "react-firebase-hooks/auth"
import { addDoc, collection, orderBy, query, serverTimestamp } from "firebase/firestore"
import { useCollectionData } from "react-firebase-hooks/firestore"
import { Message } from "./Message"
import { MessageInput } from "./MessageInput"
import "../../../assets/css/messenger/mainBlock.css"

export const MainBlock = () => {
    const [messageValue, setMessageValue] = useState("")

    const scrollBlock = useRef(null)

    const { auth, firestore } = useContext(FirebaseContext)
    const [user] = useAuthState(auth)

    const messagesRef = collection(firestore, "messages")
    const messagesRefByCreatedAt = query(messagesRef, orderBy("createdAt"))
    const [messages, loading] = useCollectionData(messagesRefByCreatedAt)

    const usersRef = collection(firestore, "users")

    const [usersCollection] = useCollectionData(usersRef)

    useEffect(() => {
        if (scrollBlock) {
            scrollBlock.current.addEventListener("DOMNodeInserted", event => {
                const { currentTarget: target } = event
                target.scroll({ top: target.scrollHeight, behavior: "smooth" })
            })
        }
    }, [])

    useEffect(async () => {
        if (usersCollection) {
            let isUserInCollection = false

            usersCollection.map(userInCollection => {
                if (userInCollection.uid === user.uid) {
                    isUserInCollection = true
                }
            })

            if (!isUserInCollection)
                await addDoc(usersRef, {
                    uid: user.uid,
                    email: user.email,
                    displayName: user.displayName,
                    photoUrl: user.photoURL,
                    phoneNumber: user?.phoneNumber,
                    creationTime: user.metadata.creationTime,
                    lastSignInTime: user.metadata.lastSignInTime,
                })
        }
    }, [usersCollection])

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

    const renderMessages = () => {
        return messages?.map((message, index) => {
            const isUserSender = user?.uid === message?.uid

            return <Message key={index} message={message} isUserSender={isUserSender}/>
        })
    }

    return (
        <div className="main-block">
            <div className="main-block__chat" ref={scrollBlock}>
                {
                    loading ? <Loader/> : renderMessages()
                }
            </div>

            <MessageInput messageValue={messageValue} setMessageValue={setMessageValue} sendMessage={sendMessage}/>
        </div>
    )
}