import React from 'react'

import TodoItem from "../TodoItem/TodoItem"
import './TodoList.css'

const TodoList = React.memo(({ todos, handleToggleComplete, handleDelete, handleSaveEdit }) => {

    return (
        <ul className="todo-list">
            {todos.map(todo => (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    handleToggleComplete={handleToggleComplete}
                    handleDelete={handleDelete}
                    handleSaveEdit={handleSaveEdit}
                />
            ))}
        </ul>

    )
})

export default TodoList