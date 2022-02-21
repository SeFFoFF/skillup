import React from "react"
import "../../assets/css/shared/sidebar/sidebar.css"
import { SidebarItemsList } from "./SidebarItemsList"

export const Sidebar = () => {
    return (
        <div className="sidebar">
            <SidebarItemsList/>
        </div>
    )
}