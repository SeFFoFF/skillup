import React from "react"
import "../../assets/css/shared/sidebar/sidebarItemIcon.css"
import { getIconByProjectName } from "../../utils"

export const SidebarItemIcon = ({ projectName = "" }) => {

    const renderIcon = () => {
        return getIconByProjectName(projectName)
    }

    return (
        <div className="item-icon">
            { renderIcon() }
        </div>
    )
}