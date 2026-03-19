import React from 'react';

import TodoItem from '../TodoItem/TodoItem';
import './TodoList.css';

const TodoList = React.memo(({ todos, handleToggleComplete, handleDelete, handleSaveEdit }) => {
  console.log(todos);
  return (
    <ul className="todo-list">
      {todos.map((todo) => {
        console.log(todo);
        return (
          <TodoItem
            key={todo.id}
            todo={todo}
            handleToggleComplete={handleToggleComplete}
            handleDelete={handleDelete}
            handleSaveEdit={handleSaveEdit}
          />
        );
      })}
    </ul>
  );
});

export default TodoList;
