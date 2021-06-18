import React from 'react'


const TodoItem = ({todo}) => {
    return (
        <tr>
            <td>{todo.text}</td>
            <td>{todo.createdAt}</td>
            <td>{todo.updatedAt}</td>
        </tr>
    )
}


const TodoList = ({todos}) => {
    return (
        <table className="table table-sm">
            <thead>
                <tr>
                    <th> Текст</th>
                    <th>Дата создания</th>
                    <th>Дата изменения</th>
                </tr>
            </thead>
            <tbody>
                {todos.map((todo) => <TodoItem todo={todo}/>)}
            </tbody>
        </table>
    )
}


export default TodoList