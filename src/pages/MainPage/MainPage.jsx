import { useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useNavigate, useLocation } from "react-router-dom";

import { selectTodos, selectLoading, selectError, selectDebouncedSearchTerm, selectSortEnabled, selectSortOrder } from '../../selectors'
import { loadTodos } from '../../actions/actions-todos'

import InputForCreateTodo from '../../component/InputForCreateTodo/InputForCreateTodo'
import TodoList from '../../component/TodoList/TodoList';
import SearchSectrion from '../../component/SearchSection/SearchSection';
import Loader from '../../component/Loader/Loader'


const MainPage = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const isOpenModal = location.pathname.includes('/task/')

    const todos = useSelector(selectTodos)
    const loading = useSelector(selectLoading)
    const error = useSelector(selectError)

    const debouncedSearchTerm = useSelector(selectDebouncedSearchTerm)
    const sortEnabled = useSelector(selectSortEnabled)
    const sortOrder = useSelector(selectSortOrder)


    const fetchTodo = () => {
        const params = new URLSearchParams()

        if (debouncedSearchTerm) {
            params.append('title_like', debouncedSearchTerm)
        }
        if (sortOrder && sortEnabled) {
            params.append('_sort', 'title');
            params.append('_order', sortOrder);
        }
        dispatch(loadTodos(params))
    }

    useEffect(() => {
        fetchTodo()
    }, [debouncedSearchTerm, sortEnabled, sortOrder, loadTodos]);


    useEffect(() => {
        if (error) {
            navigate('/error', { state: { error } })
        }

    }, [error])


    useEffect(() => {
        if (!isOpenModal && !loading) {
            fetchTodo() // Обновляем список после закрытия попапа
        }
    }, [isOpenModal])


    return (
        <div className="app">
            <SearchSectrion />
            <div className="app-content">
                <main className="todo-container">
                    {loading ? <Loader /> : <TodoList />}
                </main>
                <InputForCreateTodo />
            </div>
            {isOpenModal && <Outlet />}
        </div>
    )
}

export default MainPage