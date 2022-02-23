import React from "react"
import { Route, Routes, Navigate } from "react-router-dom"
import { Chat, Login } from "../pages"

export const MessengerRouter = () => {
    const user = false

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