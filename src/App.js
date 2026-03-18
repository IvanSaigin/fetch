// App.js
import { useState, useEffect } from 'react';
import './App.css';
import InputForCreateTodo from './component/InputForCreateTodo/InputForCreateTodo'
import TodoList from './component/TodoList/TodoList';
import SearchSectrion from './component/SearchSection/SearchSection';
import { useTodos } from './useTodos';

function App() {

  const [searchTerm, setSearchTerm] = useState('')
  const [sortEnabled, setSortEnabled] = useState(false)
  const [sortOrder, setSortOrder] = useState('')
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')

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

  if (error) {
    return (
      <div className="app">
        <div className="error-container">
          <p className="error-message">{error}</p>
          <button
            onClick={fetchTodo}
            className="retry-button">
            Попробовать снова
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <SearchSectrion
        searchTerm={searchTerm}
        sortEnabled={sortEnabled}
        sortOrder={sortOrder}
        handleSearchChange={handleSearchChange}
        handleClearSearch={handleClearSearch}
        handleSortToggle={handleSortToggle}
        handleSortOrderChange={handleSortOrderChange} />

      <div className="app-content">

        <main className="todo-container">

          {loading ?

            <div className="loader-container">
              <div className="loader"></div>
              <p>Загрузка задач...</p>
            </div> : <TodoList
              todos={todos}
              handleToggleComplete={handleToggleComplete}
              handleDelete={DeleteTodo}
              handleSaveEdit={handleSaveEdit}
            />}
        </main>

        <InputForCreateTodo handleCreate={addTodo} />
      </div>


    </div>
  );
}

export default App;