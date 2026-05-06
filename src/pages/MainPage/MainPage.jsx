import { useContext, useEffect, useState } from "react"
import InputForCreateTodo from '../../component/InputForCreateTodo/InputForCreateTodo'
import TodoList from '../../component/TodoList/TodoList';
import SearchSectrion from '../../component/SearchSection/SearchSection';
import Loader from '../../component/Loader/Loader'
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useProvider } from "../../MainProvider";
import { useSearchContext } from "../../SearchProvider";

const MainPage = () => {

    const navigate = useNavigate()
    const location = useLocation()
    const isOpenModal = location.pathname.includes('/task/')

    const { todos, loading, error, loadTodos, handleToggleComplete, addTodo, DeleteTodo, handleSaveEdit } = useProvider()

    const { debouncedSearchTerm, sortEnabled, sortOrder } = useSearchContext()

    const fetchTodo = () => {
        const params = new URLSearchParams()

        if (debouncedSearchTerm) {
            params.append('title_like', debouncedSearchTerm)
        }
        if (sortOrder && sortEnabled) {
            params.append('_sort', 'title');
            params.append('_order', sortOrder);
        }
        loadTodos(params)
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