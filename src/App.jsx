import React from "react"
import "./App.css"
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom"
import { Home } from "./features/home"
import { Shop } from "./features/shop"

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/shop/*" element={<Shop/>}/>
                <Route path="*" element={<p>404</p>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App
