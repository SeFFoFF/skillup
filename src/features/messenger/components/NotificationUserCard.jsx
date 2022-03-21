import React, { useContext } from "react"
import dayjs from "dayjs"
import { AiOutlineCheck } from "react-icons/ai"
import { VscClose } from "react-icons/vsc"
import { deleteDoc, doc, updateDoc } from "firebase/firestore"
import { FirebaseContext } from "./FirebaseProvider"
import "../../../assets/css/messenger/notificationUserCard.css"

export const NotificationUserCard = ({ notification, currentUser }) => {
    const { firestore } = useContext(FirebaseContext)

    const acceptRequestHandler = async (userId, docId) => {
        try {
            let payload

            const usersDocRef = doc(firestore, "users", userId)

            if (currentUser && currentUser.friends[0] === "placeholder") {
                payload = {
                    friends: [`${notification.sendFrom}`]
                }
            } else {
                payload = {
                    friends: [...currentUser.friends, `${notification.sendFrom}`]
                }
            }

            await updateDoc(usersDocRef, payload)

            const notificationsDocRef = doc(firestore, "notifications", docId)
            await deleteDoc(notificationsDocRef)

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