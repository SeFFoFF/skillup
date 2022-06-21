import React from "react"
import { FirebaseProvider, MessengerLayout } from "./components"

export const Messenger = () => {
    return (
        <FirebaseProvider>
            <MessengerLayout className="messenger"/>
        </FirebaseProvider>
    )
}