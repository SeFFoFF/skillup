import React, { useContext, useState, useRef, useEffect } from "react"
import { FirebaseContext, Message } from "../components"
import { useAuthState } from "react-firebase-hooks/auth"
import { useCollectionData } from "react-firebase-hooks/firestore"
import { collection, serverTimestamp, addDoc, query, orderBy, where } from "firebase/firestore"
import { Loader } from "../../../shared"
import { AiOutlineSend } from "react-icons/ai"
import "../../../assets/css/messenger/chatPage.css"

export const Chat = () => {
    const [messageValue, setMessageValue] = useState("")
    const [searchValue, setSearchValue] = useState("")

    const [userByEmail, setUserByEmail] = useState(null)

    const scrollBlock = useRef(null)

    const { auth, firestore } = useContext(FirebaseContext)
    const [user] = useAuthState(auth)

    const messagesRef = collection(firestore, "messages")
    const messagesRefByCreatedAt = query(messagesRef, orderBy("createdAt"))
    const [messages, loading] = useCollectionData(messagesRefByCreatedAt)

    const usersRef = collection(firestore, "users")

    const userSearchRef = query(usersRef, where("email", "==", searchValue))

    const [searchedUser] = useCollectionData(userSearchRef)
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

    // TODO доделать нормальный поиск
    const searchUserByEmail = () => {
        setUserByEmail(searchedUser)
    }

    return (
        <div className="chat-page">

            <div className="chat-page__left-side">
                <div className="">
                    <input type="text" value={searchValue} onChange={e => setSearchValue(e.target.value)} placeholder="Search by email"/>
                    <button onClick={searchUserByEmail}>Search</button>
                </div>
                <div className="">
                    {
                        userByEmail?.map(info => (
                            <div key={info.uid }>
                                <p>{ info.displayName }</p>
                                <p>{ info.email }</p>
                                <p>{ info.uid }</p>
                            </div>
                        ))
                    }
                </div>
            </div>

            <div className="chat-page__main">

                <div className="main__chat-block" ref={scrollBlock}>
                    {
                        loading ? <Loader/> : renderMessages()
                    }
                </div>

                <div className="main__input-block">
                    <input type="text" value={messageValue} onChange={e => setMessageValue(e.target.value)} placeholder="Message"/>
                    <button onClick={sendMessage} disabled={!messageValue} className={messageValue ? "send-button send-button--pointer" : "send-button"}>
                        <AiOutlineSend size={20}/>
                    </button>
                </div>

            </div>
        </div>
    )
}