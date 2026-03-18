import React from 'react'
import './TodoItem.css'

const TodoItem = React.memo(({ todo, handleToggleComplete, handleDelete, handleSaveEdit }) => {


    const [editingId, setEditingId] = React.useState(null)
    const [editTitle, setEditTitle] = React.useState('')

    const handleCancelEdit = () => {
        setEditingId(null)
        setEditTitle('')
    }

    const handleSave = (id, title) => {
        handleSaveEdit(id, title)
        handleCancelEdit()
    }

    return (
        <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
            {editingId === todo.id ? (
                // Режим редактирования
                <div className="todo-edit-mode">
                    <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        className="edit-input"
                        autoFocus
                    />
                    <div className="edit-actions">
                        <button onClick={() => handleSave(todo.id, editTitle)} className="save-btn">💾 Сохранить</button>
                        <button onClick={handleCancelEdit} className="cancel-btn">✕ Отмена</button>
                    </div>
                </div>
            ) : (
                // Обычный режим
                <>
                    <div className="todo-checkbox">
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
                    <div className="todo-actions">
                        <button
                            onClick={() => setEditingId(todo.id)}
                            className="action-btn edit-btn"
                            title="Редактировать">
                            ✏️
                        </button>
                        <button
                            onClick={() => handleDelete(todo.id)}
                            className="action-btn delete-btn"
                            title="Удалить">
                            🗑️
                        </button>
                    </div>
                </>
            )}
        </li>
    )
})

export default TodoItem