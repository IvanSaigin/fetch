import { useState, useCallback, useOptimistic, startTransition } from 'react';

import {
  getTodos,
  createTodoService,
  toggleTodoService,
  editTodoService,
  deleteTodoService,
} from './services';

import { todoOptimisticReducer } from './reducer';

export const useTodos = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [optimisticTodos, dispatch] = useOptimistic(todos, todoOptimisticReducer);

  const loadTodos = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getTodos();
      setTodos(data);
    } catch (err) {
      setError(err.massage);
    } finally {
      setLoading(false);
    }
  }, []);

  const addTodo = useCallback(
    async (title) => {
      const tempId = Date.now();
      //Создали дело с айди для оптимистичного состояния
      const newTodo = {
        id: tempId,
        title,
        completed: false,
      };

      startTransition(async () => {
        try {
          //добавили дело с айди временным
          dispatch({
            type: 'addTodo',
            newTodo: newTodo,
          });

          const saveTodo = await createTodoService(title);
          console.log(saveTodo);

          setTodos((prev) => {
            const withoutTemp = prev.filter((todo) => todo.id !== tempId);
            return [...withoutTemp, saveTodo];
          });
        } catch (err) {
          setError(err.massage);
          setTodos((prev) => prev.filter((c) => c.id !== newTodo.id));
        }
      });
    },
    [dispatch],
  );

  const handleToggleComplete = useCallback(
    async (id) => {
      const currentTodo = todos.find((todo) => todo.id === id);
      const newCompletedState = !currentTodo.completed;

      startTransition(async () => {
        try {
          dispatch({
            type: 'toggle',
            id,
            completed: newCompletedState,
          });

          await toggleTodoService(id, newCompletedState);

          setTodos((prev) =>
            prev.map((todo) => (todo.id === id ? { ...todo, completed: newCompletedState } : todo)),
          );
        } catch (err) {
          setError(err.massage);

          setTodos((prev) =>
            prev.map((todo) =>
              todo.id === id ? { ...todo, completed: !newCompletedState } : todo,
            ),
          );
        }
      });
    },
    [todos, dispatch],
  );

  const DeleteTodo = useCallback(
    (id) => {
      const deletedTodo = todos.find((todo) => todo.id === id);

      startTransition(async () => {
        try {
          dispatch({
            type: 'deleteTodo',
            id,
          });

          await deleteTodoService(id);

          setTodos((prev) => prev.filter((todo) => todo.id !== id));
        } catch (err) {
          setError(err.massage);

          setTodos((prev) => {
            if (deletedTodo && !prev.some((t) => t.id === id)) {
              return [...prev, deletedTodo];
            }
            return prev;
          });
        }
      });
    },
    [todos, dispatch],
  );

  const handleSaveEdit = useCallback(
    (id, title) => {
      const originalTodo = todos.find((t) => t.id === id);
      const originalTitle = originalTodo?.title;

      startTransition(async () => {
        try {
          dispatch({
            type: 'changeTodo',
            id,
            title,
          });

          await editTodoService(id, title);

          setTodos((prev) =>
            prev.map((todo) => (todo.id === id ? { ...todo, title: title } : todo)),
          );
        } catch (err) {
          setError(err.massage);

          setTodos((prev) =>
            prev.map((todo) => (todo.id === id ? { ...todo, title: originalTitle } : todo)),
          );
        }
      });
    },
    [todos, dispatch],
  );

  return {
    todos: optimisticTodos,
    loading,
    error,
    loadTodos,
    addTodo,
    handleToggleComplete,
    DeleteTodo,
    handleSaveEdit,
  };
};
