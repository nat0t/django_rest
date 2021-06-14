import React from 'react'
import { useParams } from 'react-router-dom'


const ProjectTodoItem = ({item}) => {
    return (
        <tr>
            <td>{item.text}</td>
            <td>{item.createdAt}</td>
            <td>{item.updatedAt}</td>
        </tr>
    )
}


const ProjectTodoList = ({items}) => {
    let { id } = useParams();
    let filtered_items = items.filter((item) => item.project == id)
    return (
        <table className="table table-sm">
            <thead>
                <tr>
                    <th>Текст</th>
                    <th>Дата создания</th>
                    <th>Дата изменения</th>
                </tr>
            </thead>
            <tbody>
                {filtered_items.map((item) => <ProjectTodoItem item={item} key={item.id} />)}
            </tbody>
        </table>
    )
}

export default ProjectTodoList
