import React, { useState } from "react"
import { createContext } from "react"
import { app, auth, firestore } from "../firebase"

export const FirebaseContext = createContext()

export const FirebaseProvider = ({ children }) => {
    const [chat, setChat] = useState(null)

    return (
        <FirebaseContext.Provider value={ { app, auth, firestore, chat, setChat } }>
            { children }
        </FirebaseContext.Provider>
    )
}