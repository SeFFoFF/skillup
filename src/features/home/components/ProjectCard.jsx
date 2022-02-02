import React from "react"
import "../../../assets/css/home/projectCard/projectCard.css"

export const ProjectCard = ({ text }) => {
    return (
        <div className="project-card">
            <p className="project-card__name">{ text }</p>
        </div>
    )
}