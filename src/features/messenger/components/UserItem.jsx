import React, { useContext, useEffect, useState } from "react"
import { addDoc, collection, doc, query, serverTimestamp, setDoc, where } from "firebase/firestore"
import { FirebaseContext } from "./FirebaseProvider"
import { useCollectionData } from "react-firebase-hooks/firestore"
import { useAuthState } from "react-firebase-hooks/auth"
import { IoPersonAddSharp } from "react-icons/io5"
import "../../../assets/css/messenger/userItem.css"

export const UserItem = ({ userInfo, isFriend = true }) => {
    const [isRequestSend, setIfRequestSend] = useState(false)
    const [lastMessage, setLastMessage] = useState(null)

    const { auth, firestore, setChat } = useContext(FirebaseContext)
    const [user] = useAuthState(auth)

    const isUserSender = user?.uid === lastMessage?.sendFrom

    const chatIdRef1 = user?.uid + userInfo?.uid
    const chatIdRef2 = userInfo?.uid + user?.uid

    const messagesRef = collection(firestore, "messages", chatIdRef1, "chat")
    const [messages] = useCollectionData(messagesRef)

    const chatInfoId = messages?.length ? chatIdRef1 : chatIdRef2

    const notificationsRef = collection(firestore, "notifications")
    const docIdRef = user && userInfo && query(notificationsRef, where("id", "==", user.uid + userInfo.uid))
    const [docId] = useCollectionData(docIdRef)

    const usersRef = collection(firestore, "users")
    const currentUserRef = query(usersRef, where("uid", "==", user.uid))
    const [currentUser] = useCollectionData(currentUserRef)

    const lastMessagesRef = collection(firestore, "lastMessage")
    const lastMessageRef = query(lastMessagesRef, where("id", "==", chatInfoId))
    const [lastMessageArray] = useCollectionData(lastMessageRef)

    useEffect(() => {
        lastMessageArray?.map(messageInfo => setLastMessage(messageInfo))
    }, [lastMessageArray])

    useEffect(() => {
        if (docId?.length) setIfRequestSend(true)
        else setIfRequestSend(false)

        currentUser?.map(userItem => {
            userItem.friends.map(friend => {
                if (friend === userInfo.uid)
                    setIfRequestSend(true)
            })
        })
    }, [docId, currentUser])

    const sendFriendRequestHandler = async () => {
        await addDoc(notificationsRef, {
            id: user.uid + userInfo.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
            sendFrom: user.uid,
            sendTo: userInfo.uid,
            dateTime: serverTimestamp(),
        })
        setIfRequestSend(true)
    }

    const onFriendClickHandler = async () => {
        setChat(userInfo)

        await setDoc(doc(firestore, "lastMessage", chatInfoId), {
            id: lastMessage?.id,
            sendFrom: lastMessage?.sendFrom,
            sendTo: lastMessage?.sendTo,
            text: lastMessage?.text,
            createdAt: lastMessage?.createdAt,
            unread: false
        })
    }

    return (
        <div className={isFriend ? "user-item user-item--friend" : "user-item"} onClick={onFriendClickHandler}>
            <img className="user-image" src={userInfo?.photoURL} alt=""/>
            <div className={isFriend ? "user-info" : "user-info--searched"}>
                <p className="user-info__name">{ userInfo?.displayName }</p>
                {
                    isFriend && <p className="user-info__last-message">{ isUserSender ? `you: ${lastMessage?.text}` : lastMessage?.text }</p>
                }
                {
                    !isFriend && !isRequestSend && <IoPersonAddSharp size="20px" onClick={sendFriendRequestHandler}/>
                }
            </div>
            {
                !isUserSender && lastMessage?.unread ? <div className="user-info__new-message"/> : null
            }
        </div>
    )
}