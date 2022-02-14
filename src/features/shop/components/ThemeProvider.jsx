import React, { useState } from "react"
import { ThemeContext } from "../theme/ThemeContext"

export const ThemeProvider = ({ children }) => {
    const [isDarkTheme, setIsDarkTheme] = useState(JSON.parse(localStorage.getItem("darkTheme")))

    const darkThemeToggle = () => {
        setIsDarkTheme(!isDarkTheme)
        localStorage.setItem("darkTheme", !isDarkTheme)
    }

    return (
        <ThemeContext.Provider value={ { isDarkTheme, darkThemeToggle } }>
            { children }
        </ThemeContext.Provider>
    )
}