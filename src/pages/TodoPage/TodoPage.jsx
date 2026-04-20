import { Link, useParams, useLocation, useNavigate } from "react-router-dom"
import { useTodos } from '../../useTodos';
import './TodoPage.css'
import { useState } from "react";

const TodoPage = () => {

    const { id } = useParams()
    const location = useLocation()
    const navigate = useNavigate()
    const todo = location.state?.todo
    const { DeleteTodo, handleSaveEdit, loadTodos } = useTodos()
    const [textTodo, setTextTodo] = useState(todo?.title)


    if (!todo) {
        return (
            <div className="wrapper">
                <div className="popap">
                    <p>Ошибка: задача не передана</p>
                    <Link to="/">
                        <button className="close-button">✕</button>
                    </Link>
                </div>
            </div>
        )
    }

    const handleDelete = async () => {
        await DeleteTodo(todo.id)
        await loadTodos()
        navigate('/')
    }

    const setEditingId = async () => {


        await handleSaveEdit(todo.id, textTodo)
        await loadTodos()
        navigate('/')
    }


    const disabled = !textTodo || !textTodo.trim()
    console.log('textTodo:', textTodo, 'disabled:', disabled)
    return (
        <div className="wrapper">
            <div className="popap">
                <div className="lablepopap">Редактирование задачи</div>
                <Link to="/"><button className="close-button">✕</button></Link>
                <textarea

                    value={textTodo}
                    onChange={(e) => setTextTodo(e.target.value)}
                />
                <div className="todo-actions">
                    <button
                        disabled={disabled}
                        onClick={() => setEditingId(todo.id)}
                        className="action-btn edit-btn"
                        title="Редактировать">
                        Сохранить задачу
                    </button>
                    <button
                        onClick={() => handleDelete(todo.id)}
                        className="action-btn delete-btn"
                        title="Удалить">
                        Удалить задачу
                    </button>
                </div>
            </div>
        </div>
    )
}

export default TodoPage