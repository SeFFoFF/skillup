import React, { useEffect, useState } from "react"
import "../../assets/css/home/home.css"
import { ProjectCardsList } from "./components"

// TODO create constant
const projectCards = [
    {
        id: 1,
        name: "shop",
    },
    {
        id: 2,
        name: "game",
    },
    {
        id: 3,
        name: "test",
    },
]

export const Home = () => {
    const [projects, setProjects] = useState(null)

    useEffect(() => {
        setProjects(projectCards)
    }, [])

    return (
        <div className="container">
            <h1 className="project-name">Test name</h1>
            <ProjectCardsList projects={projects}/>
        </div>
    )
}