import React, { useContext, useEffect, useState } from "react"
import { addDoc, collection, query, serverTimestamp, where } from "firebase/firestore"
import { FirebaseContext } from "./FirebaseProvider"
import { useCollectionData } from "react-firebase-hooks/firestore"
import "../../../assets/css/messenger/userItem.css"

export const UserItem = ({ currentUser, user, isFriend = true }) => {
    const [isRequestSend, setIfRequestSend] = useState(false)

    const { firestore } = useContext(FirebaseContext)

    const notificationsRef = collection(firestore, "notifications")
    const sendToUserRef = query(notificationsRef, where("sendTo", "==", user.uid))
    const [sendToUser] = useCollectionData(sendToUserRef)

    useEffect(() => {
        if (sendToUser && sendToUser.length) setIfRequestSend(true)
        else setIfRequestSend(false)
    }, [sendToUser])

    const sendFriendRequestHandler = async () => {
        await addDoc(notificationsRef, {
            name: currentUser.displayName,
            photoURL: currentUser.photoURL,
            sendFrom: currentUser.uid,
            sendTo: user.uid,
            state: "sent",
            dateTime: serverTimestamp(),
        })
        setIfRequestSend(true)
    }

    return (
        <div className="user-item">
            <img className="user-image" src={user?.photoURL} alt=""/>
            <div className="user-info">
                <p className="user-info__name">{ user?.displayName }</p>
                {
                    isFriend && <p className="user-info__last-message">Lorem ipsum dolor. Lorem ipsum dolor. Lorem ipsum dolor.</p>
                }
                {
                    !isRequestSend && <button onClick={sendFriendRequestHandler}>Send</button>
                }
            </div>
        </div>
    )
}