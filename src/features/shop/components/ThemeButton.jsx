import React, { useContext } from "react"
import { ThemeContext } from "../theme/ThemeContext"
import "../../../assets/css/shop/theme-button.css"

export const ThemeButton = () => {
    const { isDarkTheme, darkThemeToggle } = useContext(ThemeContext)

    return (
        <div className="theme-button">
            <label className="theme-button__switch">
                <input type="checkbox" onChange={darkThemeToggle} checked={isDarkTheme}/>
                <span className="switch-slider round"> </span>
            </label>
        </div>
    )
}