import React, { useState } from "react"
import "../../../assets/css/shop/gameCard/gameTag.css"
import classNames from "classnames"

export const GameTag = ({ tag, onClick = null }) => {
    const [isTagActive, setIsTagActive] = useState(false)

    const onTagClickHandler = () => {
        setIsTagActive(!isTagActive)
        onClick(tag)
    }

    return (
        <span
            className={classNames(
                ["game-tag", isTagActive && onClick ? "game-tag--active" : ""],
                [onClick ? "game-tag--pointer" : ""]
            )}
            onClick={onTagClickHandler}
        >{ tag }</span>
    )
}