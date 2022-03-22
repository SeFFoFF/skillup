import React, { useContext, useEffect, useState } from "react"
import { collection, query, where } from "firebase/firestore"
import { useCollectionData } from "react-firebase-hooks/firestore"
import { FirebaseContext } from "./FirebaseProvider"
import { UserItem } from "./UserItem"
import "../../../assets/css/messenger/searchUsersList.css"

export const SearchUsersList = ({ user }) => {
    const [isSameUser, setIsSameUser] = useState(false)
    const [searchValue, setSearchValue] = useState("")
    const [searchedUserByEmail, setSearchedUserByEmail] = useState(null)

    const { firestore } = useContext(FirebaseContext)

    const usersRef = collection(firestore, "users")
    const userSearchRef = query(usersRef, where("email", "==", searchValue))
    const [searchedUser] = useCollectionData(userSearchRef)

    useEffect(() => {
        searchedUser?.map(userItem => {
            if (userItem.uid === user.uid) setIsSameUser(true)
            else setIsSameUser(false)
        })

        setSearchedUserByEmail(searchedUser)
    }, [searchedUser])

    return (
        <div className="search-users">
            <div className="search-users__input-wrapper">
                <input type="text" value={searchValue} onChange={e => setSearchValue(e.target.value)} placeholder="Enter user email"/>
            </div>
            <div className="search-users-list">
                {
                    !isSameUser ?
                        searchedUserByEmail?.map(user => (
                            <UserItem key={user.uid} userInfo={user} isFriend={false}/>
                        ))
                        : null
                }
            </div>
        </div>
    )
}