import React from "react"
import { TiShoppingCart } from "react-icons/ti"
import { BsCodeSlash } from "react-icons/bs"
import { AiOutlineHome } from "react-icons/ai"

const ICON_SIZE = 25

export const icons = {
    default: <BsCodeSlash size={ICON_SIZE}/>,
    home: <AiOutlineHome size={ICON_SIZE}/>,
    shop: <TiShoppingCart size={ICON_SIZE}/>,
}