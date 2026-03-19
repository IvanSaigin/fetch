// App.js
import { useState, useEffect, useMemo } from 'react';
import './App.css';
import InputForCreateTodo from './component/InputForCreateTodo/InputForCreateTodo';
import TodoList from './component/TodoList/TodoList';
import SearchSectrion from './component/SearchSection/SearchSection';
import { useTodos } from './useTodos';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortEnabled, setSortEnabled] = useState(false);
  const [sortOrder, setSortOrder] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  const {
    todos,
    loading,
    error,
    loadTodos,
    addTodo,
    handleToggleComplete,
    DeleteTodo,
    handleSaveEdit,
  } = useTodos();

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const filteredTodos = useMemo(() => {
    let result = [...todos];

    if (debouncedSearchTerm) {
      result = result.filter((todo) =>
        todo.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()),
      );
    }

    if (sortEnabled) {
      result.sort((a, b) => {
        return sortOrder === 'asc'
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title);
      });
    }

    return result;
  }, [todos, debouncedSearchTerm, sortEnabled, sortOrder]);

  useEffect(() => {
    loadTodos();
  }, [loadTodos]);

  const handleSearchChange = (value) => {
    setSearchTerm(value);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
  };

  const handleSortToggle = (checked) => {
    setSort(checked);
  };

  const handleSortOrderChange = (order) => {
    setSortOrder(order);
  };
  const setSort = (e) => {
    if (sortOrder) {
      setSortOrder('');
      setSortEnabled(e);
      return;
    }

    setSortOrder('asc');
    setSortEnabled(e);
  };

  if (error) {
    return (
      <div className="app">
        <div className="error-container">
          <p className="error-message">{error}</p>
          <button onClick={loadTodos} className="retry-button">
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
        handleSortOrderChange={handleSortOrderChange}
      />

      <div className="app-content">
        <main className="todo-container">
          {loading ? (
            <div className="loader-container">
              <div className="loader"></div>
              <p>Загрузка задач...</p>
            </div>
          ) : (
            <TodoList
              todos={filteredTodos}
              handleToggleComplete={handleToggleComplete}
              handleDelete={DeleteTodo}
              handleSaveEdit={handleSaveEdit}
            />
          )}
        </main>

        <InputForCreateTodo handleCreate={addTodo} />
      </div>
    </div>
  );
}

export default App;
