import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true)
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then((res) => res.json())
      .then((date) => {
        setTodos(date.slice(0, 20))
      })
      .catch((err) => {
        console.log(err)
        setError('Ошибка при загрузке задач')
      })
      .finally(() => setLoading(false))
  }, []);



  if (loading) {
    return (
      <div className="app">
        <div className="loader-container">
          <div className="loader"></div>
          <p>Загрузка задач...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app">
        <div className="error-container">
          <p className="error-message">{error}</p>
          <button className="retry-button">
            Попробовать снова
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <main className="todo-container">
        <div className="todo-stats">
          <span>Всего задач: {todos.length}</span>
          <span>Выполнено: {todos.filter(todo => todo.completed).length}</span>
        </div>

        <ul className="todo-list">
          {todos.map(todo => (
            <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
              <div className="todo-content">
                <span className="todo-id">#{todo.id}</span>
                <span className="todo-title">{todo.title}</span>
              </div>
              <div className="todo-status">
                {todo.completed ?
                  <span className="status-badge completed-badge">✓ Выполнено</span>
                  :
                  <span className="status-badge pending-badge">○ В процессе</span>
                }
              </div>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;