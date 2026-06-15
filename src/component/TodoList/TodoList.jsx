import React from 'react'
import { useSelector } from 'react-redux'
import TodoItem from "../TodoItem/TodoItem"
import './TodoList.css'
import { Link } from 'react-router-dom'
import { selectTodos } from '../../selectors'

const TodoList = React.memo(() => {

    const todos = useSelector(selectTodos)
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