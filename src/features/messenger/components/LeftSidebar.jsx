import React, { useContext, useState } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { FirebaseContext } from "./FirebaseProvider"
import { Tab } from "./Tab"
import { FaUserFriends } from "react-icons/fa"
import { BsSearch } from "react-icons/bs"
import { FriendsList } from "./FriendsList"
import { SearchUsersList } from "./SearchUsersList"
import "../../../assets/css/messenger/leftSidebar.css"

export const LeftSidebar = () => {
    const [isFriendsTab, setIsFriendsTab] = useState(true)

    const { auth } = useContext(FirebaseContext)
    const [user] = useAuthState(auth)

    return (
        <div className="left-sidebar">
            <div className="sidebar__user-info">
                <img className="user-image" src={user?.photoURL} alt=""/>
                <p className="user-name">{ user?.displayName }</p>
            </div>
            <div className="left-sidebar__tabs">
                <Tab activeTab={true} isFriendsTab={isFriendsTab} setIsFriendsTab={setIsFriendsTab} icon={<FaUserFriends size="20px"/>}/>
                <Tab activeTab={false} isFriendsTab={isFriendsTab} setIsFriendsTab={setIsFriendsTab} icon={<BsSearch size="20px"/>}/>
            </div>
            {
                isFriendsTab ? <FriendsList/> : <SearchUsersList/>
            }
        </div>
    )
}