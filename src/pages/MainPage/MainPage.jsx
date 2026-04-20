import { useEffect, useState } from "react"
import InputForCreateTodo from '../../component/InputForCreateTodo/InputForCreateTodo'
import TodoList from '../../component/TodoList/TodoList';
import SearchSectrion from '../../component/SearchSection/SearchSection';
import { useTodos } from '../../useTodos';
import Loader from '../../component/Loader/Loader'
import { Outlet, useNavigate, useLocation } from "react-router-dom";

const MainPage = () => {

    const [searchTerm, setSearchTerm] = useState('')
    const [sortEnabled, setSortEnabled] = useState(false)
    const [sortOrder, setSortOrder] = useState('')
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')

    const navigate = useNavigate()
    const location = useLocation()

    const {
        todos,
        loading,
        error,
        loadTodos,
        addTodo,
        handleToggleComplete,
        DeleteTodo,
        handleSaveEdit
    } = useTodos();

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm)
        }, 500)

        return () => clearTimeout(timer)
    }, [searchTerm])

    const fetchTodo = () => {
        const params = new URLSearchParams()

        if (searchTerm) {
            params.append('title_like', searchTerm)
        }
        if (sortOrder && sortEnabled) {
            params.append('_sort', 'title');
            params.append('_order', sortOrder);
        }
        loadTodos(params)
    }

    useEffect(() => {
        fetchTodo()
    }, [debouncedSearchTerm, sortOrder]);


    useEffect(() => {
        if (error) {
            navigate('/error', { state: { error } })
        }

    }, [error])

    const handleSearchChange = (value) => {
        setSearchTerm(value)
    }

    const handleClearSearch = () => {
        setSearchTerm('')
    }

    const handleSortToggle = (checked) => {
        setSort(checked)
    }

    const handleSortOrderChange = (order) => {
        setSortOrder(order)
    }
    const setSort = (e) => {

        if (sortOrder) {
            setSortOrder('')
            setSortEnabled(e)
            return
        }

        setSortOrder('asc')
        setSortEnabled(e)
    }




    const isOpenModal = location.pathname.includes('/task/')

    useEffect(() => {
        if (!isOpenModal && !loading) {
            fetchTodo() // Обновляем список после закрытия попапа
        }
    }, [isOpenModal])

    return (

        <div className="app">
            <SearchSectrion
                searchTerm={searchTerm}
                sortEnabled={sortEnabled}
                sortOrder={sortOrder}
                handleSearchChange={handleSearchChange}
                handleClearSearch={handleClearSearch}
                handleSortToggle={handleSortToggle}
                handleSortOrderChange={handleSortOrderChange}
            />

            <div className="app-content">

                <main className="todo-container">

                    {loading ?

                        <Loader /> : <TodoList
                            todos={todos}
                            handleToggleComplete={handleToggleComplete}
                            handleDelete={DeleteTodo}
                            handleSaveEdit={handleSaveEdit}
                        />}
                </main>

                <InputForCreateTodo handleCreate={addTodo} />
            </div>

            {isOpenModal && <Outlet />}
        </div>
    )
}

export default MainPage