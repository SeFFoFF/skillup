import React, { useContext, useEffect, useState } from "react"
import { addDoc, collection, query, serverTimestamp, where } from "firebase/firestore"
import { FirebaseContext } from "./FirebaseProvider"
import { useCollectionData } from "react-firebase-hooks/firestore"
import { useAuthState } from "react-firebase-hooks/auth"
import "../../../assets/css/messenger/userItem.css"

export const UserItem = ({ userInfo, isFriend = true }) => {
    const [isRequestSend, setIfRequestSend] = useState(false)

    const { auth, firestore } = useContext(FirebaseContext)
    const [user] = useAuthState(auth)

    const notificationsRef = collection(firestore, "notifications")

    const docIdRef = user && userInfo && query(notificationsRef, where("id", "==", user.uid + userInfo.uid))
    const [docId] = useCollectionData(docIdRef)

    useEffect(() => {
        if (docId && docId.length) setIfRequestSend(true)
        else setIfRequestSend(false)
    }, [docId])

    const sendFriendRequestHandler = async () => {
        await addDoc(notificationsRef, {
            displayName: user.displayName,
            photoURL: user.photoURL,
            sendFrom: user.uid,
            sendTo: userInfo.uid,
            dateTime: serverTimestamp(),
        })
        setIfRequestSend(true)
    }

    return (
        <div className="user-item">
            <img className="user-image" src={userInfo?.photoURL} alt=""/>
            <div className="user-info">
                <p className="user-info__name">{ userInfo?.displayName }</p>
                {
                    isFriend && <p className="user-info__last-message">Lorem ipsum dolor. Lorem ipsum dolor. Lorem ipsum dolor.</p>
                }
                {
                    !isFriend && !isRequestSend && <button onClick={sendFriendRequestHandler}>Send</button>
                }
            </div>
        </div>
    )
}