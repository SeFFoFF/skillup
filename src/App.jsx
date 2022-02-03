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
        <div className="app-container">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home/>} />

                    <Route path="/shop" element={<Shop/>}/>
                    {/*<Route path=":home" element={null} />*/}
                    {/*</Route>*/}
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App
