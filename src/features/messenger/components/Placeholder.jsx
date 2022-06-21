import React from "react"
import "../../../assets/css/messenger/placeholder.css"

export const Placeholder = ({ text, icon = null }) => {
    return (
        <div className="placeholder">
            {
                icon
            }
            <p className="placeholder-text">{ text }</p>
        </div>
    )
}