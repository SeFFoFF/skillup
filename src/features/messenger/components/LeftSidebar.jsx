import React, { useContext, useState } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { FirebaseContext } from "./FirebaseProvider"
import { Tab } from "./Tab"
import { FaUserFriends } from "react-icons/fa"
import { BsSearch } from "react-icons/bs"
import { FriendsList } from "./FriendsList"
import { SearchUsersList } from "./SearchUsersList"
import { UserInfoModal } from "./UserInfoModal"
import { NotificationModal } from "./NotificationModal"
import { NotificationIcon } from "./NotificationIcon"
import "../../../assets/css/messenger/leftSidebar.css"

export const LeftSidebar = () => {
    const [isFriendsTab, setIsFriendsTab] = useState(true)
    const [isUserInfoModalShow, setIsUserInfoModalShow] = useState(false)
    const [isNotificationModalShow, setIsNotificationModalShow] = useState(false)

    const { auth } = useContext(FirebaseContext)
    const [user] = useAuthState(auth)

    const renderModal = () => {
        if (isUserInfoModalShow) return <UserInfoModal user={user} setActive={setIsUserInfoModalShow}/>
        if (isNotificationModalShow) return <NotificationModal user={user} setActive={setIsNotificationModalShow}/>
    }

    return (
        <div className="left-sidebar">
            <div className="current-user-info__wrapper">
                <div className="current-user-info" onClick={() => setIsUserInfoModalShow(true)}>
                    <img className="current-user-image" src={user?.photoURL} alt=""/>
                    <p className="current-user-name">{ user?.displayName }</p>
                </div>

                <NotificationIcon setActive={setIsNotificationModalShow}/>
            </div>

            {
                renderModal()
            }

            <div className="tabs">
                <Tab activeTab={true} isFriendsTab={isFriendsTab} setIsFriendsTab={setIsFriendsTab} icon={<FaUserFriends size="20px"/>}/>
                <Tab activeTab={false} isFriendsTab={isFriendsTab} setIsFriendsTab={setIsFriendsTab} icon={<BsSearch size="20px"/>}/>
            </div>

            {
                isFriendsTab ? <FriendsList user={user}/> : <SearchUsersList/>
            }
        </div>
    )
}