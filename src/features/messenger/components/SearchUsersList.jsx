import React, { useContext, useEffect, useState } from "react"
import { collection, query, where } from "firebase/firestore"
import { useCollectionData } from "react-firebase-hooks/firestore"
import { FirebaseContext } from "./FirebaseProvider"
import { UserItem } from "./UserItem"

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
            if (userItem.uid === user.uid)
                setIsSameUser(true)
        })
    }, [searchedUser])

    const searchUserByEmail = () => {
        setSearchedUserByEmail(searchedUser)
    }

    // TODO Oops placeholder and styles for search input

    return (
        <div className="search-users">
            <div className="">
                <input type="text" value={searchValue} onChange={e => setSearchValue(e.target.value)} placeholder="Search by email"/>
                <button onClick={searchUserByEmail}>Search</button>
            </div>
            <div className="search-users-list">
                {
                    !isSameUser ?
                        searchedUserByEmail?.map(user => (
                            <UserItem key={user.uid} userInfo={user} isFriend={false}/>
                        ))
                        : <p>Oops</p>
                }
            </div>
        </div>
    )
}