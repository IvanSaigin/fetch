import { Link, useParams, useLocation, useNavigate } from "react-router-dom"
import './TodoPage.css'
import { useState, useEffect } from "react"
import { getTodoByIdService } from "../../services"
import Loader from "../../component/Loader/Loader"
import { useDispatch } from 'react-redux'
import { deleteTodo, handleSaveEdit } from '../../actions/actions-todos'

const TodoPage = () => {

    const dispatch = useDispatch()

    const { id } = useParams()
    const location = useLocation()
    const navigate = useNavigate()
    const todostate = location.state?.todo

    const [todo, setTodo] = useState(todostate || null)
    const [textTodo, setTextTodo] = useState(todostate?.title || '')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (todo) return

        const fetchTodo = async () => {
            try {
                setLoading(true)
                const data = await getTodoByIdService(id)
                setTodo(data)
                setTextTodo(data.title)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }
        fetchTodo()
    }, [id])

    if (error || !todo) {
        return (
            <div className="wrapper">
                <div className="popap">
                    <p>Ошибка: {error}</p>
                    <Link to="/">
                        <button className="close-button">✕</button>
                    </Link>
                </div>
            </div>
        )
    }

    if (loading) {
        return (
            <div className="wrapper">
                <div className="popap">
                    <Loader />
                    <Link to="/">
                        <button className="close-button">✕</button>
                    </Link>
                </div>
            </div>
        )
    }

    const handleDelete = () => {
        dispatch(deleteTodo(todo.id))  // ← ДОБАВИТЬ dispatch!
        navigate('/')
    }

    const handleSave = () => {
        dispatch(handleSaveEdit(todo.id, textTodo))  // ← ДОБАВИТЬ dispatch!
        navigate('/')
    }

    const disabled = !textTodo || !textTodo.trim()

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
                        onClick={handleSave}  // ← Изменил название
                        className="action-btn edit-btn"
                        title="Редактировать">
                        Сохранить задачу
                    </button>
                    <button
                        onClick={handleDelete}
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