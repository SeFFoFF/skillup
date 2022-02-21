import React from "react"
import { Link } from "react-router-dom"
import { SidebarItemIcon } from "./SidebarItemIcon"
import "../../assets/css/shared/sidebar/sidebarItem.css"

export const SidebarItem = ({ projectName }) => {
    const url = projectName === "Home" ? "/" : `/${projectName}`

    return (
        <Link className="sidebar-item" to={url}>
            <SidebarItemIcon projectName={projectName}/>
            <p className="sidebar-item__name">{ projectName }</p>
        </Link>
    )
}