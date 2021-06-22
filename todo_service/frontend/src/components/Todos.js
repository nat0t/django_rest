import React from 'react'
import {Link} from "react-router-dom";


const TodoItem = ({todo, deleteTodo}) => {
    return (
        <tr>
            <td>{todo.text}</td>
            <td>{todo.createdAt}</td>
            <td>{todo.updatedAt}</td>
            <td>
                <button onClick={() => deleteTodo(todo.id)}
                        type='button'>Delete
                </button>
            </td>
        </tr>
    )
}


const TodoList = ({todos, deleteTodo}) => {
    return (
        <div>
            <table className="table table-sm">
                <thead>
                <tr>
                    <th> Текст</th>
                    <th>Дата создания</th>
                    <th>Дата изменения</th>
                </tr>
                </thead>
                <tbody>
                {todos.map((todo) => <TodoItem todo={todo} deleteTodo={deleteTodo} key={todo.id}/>)}
                </tbody>
            </table>
            <Link to='/todos/create'>Create</Link>
        </div>
    )
}


export default TodoList