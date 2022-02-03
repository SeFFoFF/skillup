import React from "react"
import "../../../assets/css/shop/gameCard/gameTag.css"

export const GameTag = ({ tag }) => {
    return (
        <span className="game-tag">{ tag }</span>
    )
}