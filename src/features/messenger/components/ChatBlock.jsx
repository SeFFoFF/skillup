import React, { useContext, useEffect, useRef } from "react"
import { Loader } from "../../../shared"
import { FirebaseContext } from "./FirebaseProvider"
import { useAuthState } from "react-firebase-hooks/auth"
import { addDoc, collection, orderBy, query } from "firebase/firestore"
import { useCollectionData } from "react-firebase-hooks/firestore"
import { Message } from "./Message"
import "../../../assets/css/messenger/chatBlock.css"

export const ChatBlock = () => {
    const scrollBlock = useRef(null)

    const { auth, firestore } = useContext(FirebaseContext)
    const [user] = useAuthState(auth)

    const usersRef = collection(firestore, "users")
    const [usersCollection] = useCollectionData(usersRef)

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

    const renderMessages = () => {
        return messages?.map((message, index) => {
            const isUserSender = user?.uid === message?.uid

            return <Message key={index} message={message} isUserSender={isUserSender}/>
        })
    }

    return (
        <div className="chat-block" ref={scrollBlock}>
            {
                loading ? <Loader/> : renderMessages()
            }
        </div>
    )
}