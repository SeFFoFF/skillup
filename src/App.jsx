import React from "react"
import "./App.css"
import {
    BrowserRouter,
    Routes,
    Route,
    HashRouter
} from "react-router-dom"
import { Home } from "./features/home"
import { Shop } from "./features/shop"
import { Messenger } from "./features/messenger"

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/shop/*" element={<Shop/>}/>
                <Route path="/messenger/*" element={<Messenger/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App
