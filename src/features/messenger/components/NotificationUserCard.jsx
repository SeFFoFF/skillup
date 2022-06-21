import React, { useContext, useEffect, useState } from "react"
import dayjs from "dayjs"
import { AiOutlineCheck } from "react-icons/ai"
import { VscClose } from "react-icons/vsc"
import { deleteDoc, doc, updateDoc } from "firebase/firestore"
import { FirebaseContext } from "./FirebaseProvider"
import "../../../assets/css/messenger/notificationUserCard.css"

export const NotificationUserCard = ({ notification, currentUser, users }) => {
    const [sendFromUser, setSetFromUser] = useState(null)

    const { firestore } = useContext(FirebaseContext)

    useEffect(() => {
        users?.map(userItem => {
            if (userItem.uid === notification.sendFrom)
                setSetFromUser(userItem)
        })
    }, [users])

    const acceptRequestHandler = async (userId, docId) => {
        try {
            let payloadForCurrentUser
            let payLoadForSendFromUser

            const currentUserDocRef = doc(firestore, "users", userId)
            const sendFromUserDocRef = doc(firestore, "users", sendFromUser.docId)

            if (currentUser && currentUser.friends[0] === "placeholder") {
                payloadForCurrentUser = {
                    friends: [`${notification.sendFrom}`]
                }
            } else {
                payloadForCurrentUser = {
                    friends: [...currentUser.friends, `${notification.sendFrom}`]
                }
            }

            if (sendFromUser && sendFromUser.friends[0] === "placeholder") {
                payLoadForSendFromUser = {
                    friends: [`${notification.sendTo}`]
                }
            } else {
                payLoadForSendFromUser = {
                    friends: [...sendFromUser.friends, `${notification.sendTo}`]
                }
            }

            await updateDoc(currentUserDocRef, payloadForCurrentUser)
            await updateDoc(sendFromUserDocRef, payLoadForSendFromUser)

            const notificationsDocRef = doc(firestore, "notifications", docId)
            await deleteDoc(notificationsDocRef)

            // TODO create notifications
            alert("Request has been accepted")
        } catch (error) {
            alert(error)
        }
    }

    const deleteRequestHandler = async (docId) => {
        try {
            const notificationsDocRef = doc(firestore, "notifications", docId)
            await deleteDoc(notificationsDocRef)

            alert("Request has been canceled")
        } catch (error) {
            alert(error)
        }
    }

    return (
        <div className="notification-user-card">

            <div className="user-info">
                <img className="user-image" src={notification?.photoURL} alt=""/>
                <div className="user-info__wrapper">
                    <p className="user-info__name">{ notification?.displayName }</p>
                    <p className="user-info__request-time">{ dayjs.unix(notification?.dateTime.seconds).format("HH:mm, DD.MM.YYYY") }</p>
                </div>
            </div>

            <div className="buttons-wrapper">
                <AiOutlineCheck size="20px" onClick={() => acceptRequestHandler(currentUser.docId, notification.id)}/>
                <VscClose size="20px" onClick={() => deleteRequestHandler(notification.id)}/>
            </div>

        </div>
    )
}