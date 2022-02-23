import React from "react"
import { createContext } from "react"
import { app, auth, firestore } from "../firebase.config"

const FirebaseContext = createContext()

export const FirebaseProvider = ({ children }) => {
    return (
        <FirebaseContext.Provider value={ { app, auth, firestore } }>
            { children }
        </FirebaseContext.Provider>
    )
}