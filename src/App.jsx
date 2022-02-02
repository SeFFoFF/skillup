import React from "react"
import "./App.css"
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom"
import { Home } from "./features/home"

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/shop" element={<Home/>} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
