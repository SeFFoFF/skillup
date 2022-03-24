import React, { useContext, useEffect, useRef } from "react"
import { Loader } from "../../../shared"
import { FirebaseContext } from "./FirebaseProvider"
import { useAuthState } from "react-firebase-hooks/auth"
import { addDoc, collection } from "firebase/firestore"
import { useCollectionData } from "react-firebase-hooks/firestore"
import { Message } from "./Message"
import "../../../assets/css/messenger/chatBlock.css"

export const ChatBlock = ({ messagesAndLoading }) => {
    const scrollBlock = useRef(null)

    const { auth, firestore, chat } = useContext(FirebaseContext)
    const [user] = useAuthState(auth)

    const usersRef = collection(firestore, "users")
    const [usersCollection] = useCollectionData(usersRef)

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
                    photoURL: user.photoURL,
                    phoneNumber: user?.phoneNumber,
                    creationTime: user.metadata.creationTime,
                    lastSignInTime: user.metadata.lastSignInTime,
                    friends: ["placeholder"]
                })
        }
    }, [usersCollection])

    useEffect(() => {
        if (scrollBlock) {
            scrollBlock.current.addEventListener("DOMNodeInserted", event => {
                const { currentTarget: target } = event
                target.scroll({ top: target.scrollHeight, behavior: "smooth" })
            })
        }
    }, [])

    const renderMessages = () => {
        if (messagesAndLoading.messages1?.length) {
            return messagesAndLoading.loading1 ?
                <Loader/> 
                :
                messagesAndLoading.messages1?.map((message, index) => {
                    const isUserSender = user?.uid === message?.sendFrom

                    return <Message key={index} message={message} isUserSender={isUserSender}/>
                })
        } else {
            return messagesAndLoading.loading2 ?
                <Loader/>
                :
                messagesAndLoading.messages2?.map((message, index) => {
                    const isUserSender = user?.uid === message?.sendFrom

                    return <Message key={index} message={message} isUserSender={isUserSender}/>
                })
        }
    }

    return (
        <div className="chat-block" ref={scrollBlock}>
            {
                chat ? renderMessages() : <p>Select a friend to chat with him</p>
            }
        </div>
    )
}