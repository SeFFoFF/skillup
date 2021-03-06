import React, { useContext, useEffect, useState } from "react"
import { NotificationUserCard } from "./NotificationUserCard"
import { collection, onSnapshot } from "firebase/firestore"
import { FirebaseContext } from "./FirebaseProvider"
import { useAuthState } from "react-firebase-hooks/auth"
import { Placeholder } from "./Placeholder"
import "../../../assets/css/messenger/notificationModal.css"

export const NotificationModal = ({ setActive }) => {
    const [notifications, setNotifications] = useState([])
    const [users, setUsers] = useState([])
    const [currentUser, setCurrentUser] = useState(null)

    const { auth, firestore } = useContext(FirebaseContext)
    const [user] = useAuthState(auth)

    useEffect(() => {
        const unsubscribeNotifications = onSnapshot(collection(firestore, "notifications"), (snapshot) => {
            setNotifications(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        })

        const unsubscribeUsers = onSnapshot(collection(firestore, "users"), (snapshot) => {
            setUsers(snapshot.docs.map((doc) => ({ ...doc.data(), docId: doc.id })))
        })

        return () => {
            unsubscribeNotifications()
            unsubscribeUsers()
        }
    }, [])

    useEffect(() => {
        users?.map(userItem => {
            if (userItem.uid === user.uid) {
                setCurrentUser(userItem)
            }
        })
    }, [users])

    const renderNotifications = () => {
        return notifications?.map(notification =>
            <NotificationUserCard
                key={notification.id}
                notification={notification}
                currentUser={currentUser}
                users={users}
            />
        )
    }

    return (
        <div className="notification-modal" onClick={() => setActive(false)}>
            <div className="notification-modal__content" onClick={e => e.stopPropagation()}>
                {notifications?.length ? <p>Friend requests</p> : <Placeholder text="No recent notifications"/>}
                {
                    renderNotifications()
                }
            </div>
        </div>
    )
}