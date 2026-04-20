import React from 'react'

import TodoItem from "../TodoItem/TodoItem"
import './TodoList.css'
import { Link } from 'react-router-dom'

const TodoList = React.memo(({ todos, handleToggleComplete, handleDelete, handleSaveEdit, }) => {

    return (
        <ul className="todo-list">
            {todos.map(todo => (
                <Link to={`task/${todo.id}`} state={{ todo }}  key={todo.id}>
                    <TodoItem
                        todo={todo}
                        handleToggleComplete={handleToggleComplete}
                        handleDelete={handleDelete}
                        handleSaveEdit={handleSaveEdit}
                    />
                </Link>
            ))}
        </ul>

    )
})

export default TodoList