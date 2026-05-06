import React from 'react'

import TodoItem from "../TodoItem/TodoItem"
import './TodoList.css'
import { Link } from 'react-router-dom'
import { useProvider } from '../../MainProvider'

const TodoList = React.memo(() => {

    const { todos } = useProvider()

    return (
        <ul className="todo-list">
            {todos.map(todo => (
                <Link to={`task/${todo.id}`} state={{ todo }} key={todo.id}>
                    <TodoItem
                        todo={todo}
                    />
                </Link>
            ))}
        </ul>

    )
})

export default TodoList