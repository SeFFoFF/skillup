import React, { useContext, useEffect, useRef } from "react"
import { Loader } from "../../../shared"
import { FirebaseContext } from "./FirebaseProvider"
import { useAuthState } from "react-firebase-hooks/auth"
import { addDoc, collection } from "firebase/firestore"
import { useCollectionData } from "react-firebase-hooks/firestore"
import { Message } from "./Message"
import { Placeholder } from "./Placeholder"
import dayjs from "dayjs"
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

    // TODO Last seen, open friend modal, delete friend

    return (
        <div className="chat-block">
            {
                chat &&
                <div className="chat-block__header">
                    <img className="friend-image" src={chat?.photoURL} alt="icon"/>
                    <div className="friend-info">
                        <p className="friend-name">{ chat?.displayName }</p>
                        <p>{ `Last seen at ${dayjs(chat?.lastSignInTime).format("DD.MM.YYYY hh:mm")} (test)`  }</p>
                    </div>
                </div>
            }
            <div className="chat-block__wrapper" ref={scrollBlock}>
                {
                    chat ? renderMessages() : <Placeholder text="Select a friend to chat with him"/>
                }
            </div>
        </div>
    )
}