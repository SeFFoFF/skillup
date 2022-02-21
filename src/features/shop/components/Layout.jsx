import React, { useContext } from "react"
import { Header } from "./Header"
import { Route, Routes } from "react-router-dom"
import { GamePage, GamesPage } from "../pages"
import { ThemeContext } from "../theme/ThemeContext"
import classNames from "classnames"
import { Sidebar } from "../../../shared/Sidebar"
import "../../../assets/css/shop/layout.css"

export const Layout = ({ className = "" }) => {
    const { isDarkTheme } = useContext(ThemeContext)
    
    return (
        <div className={classNames([`layout ${className}`, isDarkTheme ? `${className}--dark` : ""])}>
            <Sidebar/>
            <div className="layout-container">
                <Header/>
                <Routes>
                    <Route path="/" element={<GamesPage/>}/>
                    <Route path=":gameName" element={<GamePage/>}/>
                    <Route path="/*" element={<h2>404</h2>}/>
                </Routes>
            </div>
        </div>
    )
}