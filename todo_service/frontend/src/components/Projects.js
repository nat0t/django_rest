import React from 'react'
import {Link} from "react-router-dom";


const ProjectItem = ({project, deleteProject}) => {
    return (
        <tr>
            <td>
                <Link to={`projects/${project.id}`}>{project.name}</Link>
            </td>
            <td>{project.repoLink}</td>
            <td>
                <button onClick={() => deleteProject(project.id)}
                        type='button'>Delete
                </button>
            </td>
        </tr>
    )
}


const ProjectList = ({projects, deleteProject}) => {
    return (
        <div>
            <table className="table table-sm">
                <thead>
                <tr>
                    <th>Название проекта</th>
                    <th>Ссылка на репозиторий</th>
                </tr>
                </thead>
                <tbody>
                {projects.map((project) => <ProjectItem project={project} deleteProject={deleteProject} key={project.id}/>)}
                </tbody>
            </table>
            <Link to='/projects/create'>Create</Link>
        </div>
    )
}


export default ProjectList