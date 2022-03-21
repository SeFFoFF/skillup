import React, { useContext, useState } from "react"
import { collection, query, where } from "firebase/firestore"
import { useCollectionData } from "react-firebase-hooks/firestore"
import { FirebaseContext } from "./FirebaseProvider"
import { UserItem } from "./UserItem"

export const SearchUsersList = () => {
    const [searchValue, setSearchValue] = useState("kveenter@gmail.com")
    const [searchedUserByEmail, setSearchedUserByEmail] = useState(null)

    const { firestore } = useContext(FirebaseContext)

    const usersRef = collection(firestore, "users")
    const userSearchRef = query(usersRef, where("email", "==", searchValue))
    const [searchedUser] = useCollectionData(userSearchRef)

    const searchUserByEmail = () => {
        setSearchedUserByEmail(searchedUser)
    }

    return (
        <div className="search-users">
            <div className="">
                <input type="text" value={searchValue} onChange={e => setSearchValue(e.target.value)} placeholder="Search by email"/>
                <button onClick={searchUserByEmail}>Search</button>
            </div>
            <div className="search-users-list">
                {
                    searchedUserByEmail?.map(user => (
                        <UserItem key={user.uid} userInfo={user} isFriend={false}/>
                    ))
                }
            </div>
        </div>
    )
}