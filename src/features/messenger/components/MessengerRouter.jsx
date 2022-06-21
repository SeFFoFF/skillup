import React, { useContext } from "react"
import { Route, Routes, Navigate } from "react-router-dom"
import { Chat, Login } from "../pages"
import { useAuthState } from "react-firebase-hooks/auth"
import { FirebaseContext } from "./FirebaseProvider"

export const MessengerRouter = () => {
    const { auth } = useContext(FirebaseContext)
    const [user] = useAuthState(auth)

    return user ?
        <Routes>
            <Route path="/chat" element={<Chat/>}/>
            <Route path="/*" element={<Navigate to="chat"/>}/>
        </Routes>
        :
        <Routes>
            <Route path="/login" element={<Login/>}/>
            <Route path="/*" element={<Navigate to="login"/>}/>
        </Routes>
}