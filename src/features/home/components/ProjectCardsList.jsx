import React from "react"
import { ProjectCard } from "./ProjectCard"
import "../../../assets/css/home/projectCard/projectCardsList.css"
import { Link } from "react-router-dom"

export const ProjectCardsList = ({ projects }) => {

    const renderProjectCards = () => {
        return projects.map(card => (
            <Link key={card.id} to={`/${card.name.toLowerCase()}`}>
                <ProjectCard text={card.name}/>
            </Link>
        ))
    }

    return (
        <div className="project-card-list">
            { projects && projects.length ? renderProjectCards() : <p>No cards yet</p> }
        </div>
    )
}