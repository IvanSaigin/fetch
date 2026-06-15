import React, { useState } from 'react';
import { useDispatch } from 'react-redux'
import './InputForCreateTodo.css'
import { addTodo } from '../../actions/actions-todos'

const InputForCreateTodo = React.memo(() => {
    const [newTodoTitle, setNewTodoTitle] = useState('');

    const dispatch = useDispatch()

    const onSubmit = (e) => {
        e.preventDefault()
        dispatch(addTodo(newTodoTitle))
        setNewTodoTitle('')
    }

    return (
        <form onSubmit={onSubmit} className="create-todo-sidebar" >
            <div className="create-todo-card">
                <h3>Создать новую задачу</h3>
                <p className="sidebar-description">
                    Добавьте новую задачу в ваш список дел
                </p>

                <div className="create-todo-form">
                    <textarea
                        value={newTodoTitle}
                        onChange={(e) => setNewTodoTitle(e.target.value)}
                        placeholder="Введите описание задачи..."
                        className="create-todo-input"
                        rows="4"
                    />

                    <button
                        type='submit'
                        className="create-todo-button"
                        disabled={!newTodoTitle.trim()}
                    >
                        Создать задачу
                    </button>
                </div>
            </div>
        </form >
    )
})

export default InputForCreateTodo