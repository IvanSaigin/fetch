import React from 'react'
import './TodoItem.css'
import { useProvider } from '../../MainProvider'

const TodoItem = React.memo(({ todo }) => {

    const { handleToggleComplete } = useProvider()

    return (

        <li className={`todo-item ${todo.completed ? 'completed' : ''}`} >

            <>
                <div className="todo-checkbox" onClick={(e) => e.stopPropagation()}>
                    <input
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() => handleToggleComplete(todo.id)}
                        className="todo-checkbox-input"
                    />
                </div>
                <div className="todo-content">
                    <span className="todo-title">{todo.title}</span>
                </div>
                <div className="todo-status">
                    {todo.completed ? (
                        <span className="status-badge completed-badge">✓ Выполнено</span>
                    ) : (
                        <span className="status-badge pending-badge">○ В процессе</span>
                    )}
                </div>

            </>

        </li>

    )
})

export default TodoItem