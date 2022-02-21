import React, { useEffect, useState } from "react"
import { projectsData } from "../../constants"
import { SidebarItem } from "./SidebarItem"
import "../../assets/css/shared/sidebar/sidebarItemsList.css"

export const SidebarItemsList = () => {
    const [projects, setProjects] = useState([])

    useEffect(() => {
        setProjects([{ id: 0, name: "Home" }, ...projectsData])
    }, [])

    const renderSidebarItems = () => {
        return projects.map(project => <SidebarItem key={project.id} projectName={project.name}/>)
    }
    return (
        <div className="sidebar__items-list">
            {
                renderSidebarItems()
            }
        </div>
    )
}