import React from "react"
import "../../../assets/css/shop/gameCard/imageCover.css"

export const ImageCover = ({ imageUrl = "" }) => {
    return (
        <div className="image-cover" style={{ backgroundImage: `url(${imageUrl})` }}/>
    )
}
