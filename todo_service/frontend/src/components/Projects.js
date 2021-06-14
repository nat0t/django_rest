import React from 'react'
import {Link} from "react-router-dom";


const ProjectItem = ({project}) => {
    return (
        <tr>
            <td>
                <Link to={`projects/${project.id}`}>{project.name}</Link>
            </td>
            <td>{project.repoLink}</td>
        </tr>
    )
}


const ProjectList = ({projects}) => {
    return (
        <table className="table table-sm">
            <thead>
                <tr>
                    <th>Название проекта</th>
                    <th>Ссылка на репозиторий</th>
                </tr>
            </thead>
            <tbody>
                {projects.map((project) => <ProjectItem project={project} key={project.id} />)}
            </tbody>
        </table>
    )
}


export default ProjectList