import React, { useContext, useEffect, useState } from "react"
import { UserItem } from "./UserItem"
import { collection, query, where } from "firebase/firestore"
import { useCollectionData } from "react-firebase-hooks/firestore"
import { FirebaseContext } from "./FirebaseProvider"
import { Placeholder } from "./Placeholder"
import { GiSadCrab } from "react-icons/gi"
import "../../../assets/css/messenger/friendsList.css"

export const FriendsList = ({ user }) => {
    const [friendsUid, setFriendsUid] = useState([""])

    const { firestore } = useContext(FirebaseContext)

    const usersRef = collection(firestore, "users")

    const currentUserRef = user && query(usersRef, where("uid", "==", user.uid))
    const [currentUser] = useCollectionData(currentUserRef)

    const friendRef = user && query(usersRef, where("uid", "in", friendsUid))
    const [friends] = useCollectionData(friendRef)

    useEffect(() => {
        currentUser && currentUser.map(currentUser => setFriendsUid(currentUser.friends))
    }, [currentUser])

    const renderFriends = () => {
        return friends && friends.map(friend => {
            return <UserItem key={friend.uid} userInfo={friend} isFriend={true}/>
        })
    }

    return (
        <div className="friends-list">
            {
                friends && friends.length ? renderFriends() : <Placeholder text="No friends yet" icon={<GiSadCrab size="75px" color="#cccccc"/>}/>
            }
        </div>
    )
}