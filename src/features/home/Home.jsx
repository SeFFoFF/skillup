import React, { useEffect, useState } from "react"
import "../../assets/css/home/home.css"
import { ProjectCardsList } from "./components"
import { projectsData } from "../../constants"

export const Home = () => {
    const [projects, setProjects] = useState(null)

    useEffect(() => {
        setProjects(projectsData)
    }, [])

    return (
        <div className="home">
            <h1 className="project-name">Test name</h1>
            <ProjectCardsList projects={projects}/>
        </div>
    )
}