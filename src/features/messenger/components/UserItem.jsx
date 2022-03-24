import React, { useContext, useEffect, useState } from "react"
import { addDoc, collection, query, serverTimestamp, where } from "firebase/firestore"
import { FirebaseContext } from "./FirebaseProvider"
import { useCollectionData } from "react-firebase-hooks/firestore"
import { useAuthState } from "react-firebase-hooks/auth"
import { IoPersonAddSharp } from "react-icons/io5"
import "../../../assets/css/messenger/userItem.css"

export const UserItem = ({ userInfo, isFriend = true }) => {
    const [isRequestSend, setIfRequestSend] = useState(false)

    const { auth, firestore, setChat } = useContext(FirebaseContext)
    const [user] = useAuthState(auth)

    const notificationsRef = collection(firestore, "notifications")

    const docIdRef = user && userInfo && query(notificationsRef, where("id", "==", user.uid + userInfo.uid))
    const [docId] = useCollectionData(docIdRef)

    const usersRef = collection(firestore, "users")
    const currentUserRef = query(usersRef, where("uid", "==", user.uid))
    const [currentUser] = useCollectionData(currentUserRef)

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

    return (
        <div className={isFriend ? "user-item user-item--friend" : "user-item"} onClick={() => setChat(userInfo)}>
            <img className="user-image" src={userInfo?.photoURL} alt=""/>
            <div className={isFriend ? "user-info" : "user-info--searched"}>
                <p className="user-info__name">{ userInfo?.displayName }</p>
                {
                    isFriend && <p className="user-info__last-message">Lorem ipsum dolor. Lorem ipsum dolor. Lorem ipsum dolor.</p>
                }
                {
                    !isFriend && !isRequestSend && <IoPersonAddSharp size="20px" onClick={sendFriendRequestHandler}/>
                }
            </div>
        </div>
    )
}