import React from 'react'


const ProjectItem = ({project}) => {
    return (
        <tr>
            <td>
                {project.name}
            </td>
            <td>
                {project.repoLink}
            </td>
        </tr>
    )
}


const ProjectList = ({projects}) => {
    return (
        <table className="table table-sm">
            <thead>
                <tr>
                    <th>
                        Название проекта
                    </th>
                    <th>
                        Ссылка на репозиторий
                    </th>
                </tr>
            </thead>
            <tbody>
                {projects.map((project) => <ProjectItem project={project}/>)}
            </tbody>
        </table>
    )
}


export default ProjectList