import {
    getTodos,
    createTodoService,
    toggleTodoService,
    editTodoService,
    deleteTodoService
} from '../services'

import { setLoadingAction, setErrorAction, setTodosAction, optimisticDeleteAction, restoreTodoAction, OptimisticHandleSaveEditAction, OptimisticHandleToggleAction, addTodoAction } from './actionsCreater'

// загрузка списка
export const loadTodos = (params) => async (dispatch) => {
    try {
        dispatch(setLoadingAction(true))
        const date = await getTodos(params)
        dispatch(setTodosAction(date))
    } catch (err) {
        dispatch(setErrorAction(err.message))
    } finally {
        dispatch(setLoadingAction(false))
    }
}

// оптимистичное удаление
export const deleteTodo = (id) => async (dispatch, getState) => {
    const { todos } = getState()
    const deletedTodo = todos.todos.find(t => t.id === id)

    try {
        // Оптимистично удаляем
        dispatch(optimisticDeleteAction(id))

        await deleteTodoService(id)

    } catch (err) {
        dispatch(setErrorAction(err.message))
        // Восстанавливаем
        if (deletedTodo) {
            dispatch(restoreTodoAction(deletedTodo))
        }
    }
}

// оптимистичное сохранение изменений дела
export const handleSaveEdit = (id, title) => async (dispatch, getState) => {
    const { todos } = getState()
    const originalTodo = todos.todos.find(t => t.id === id);
    const originalTitle = originalTodo?.title;

    try {
        dispatch(OptimisticHandleSaveEditAction(id, title));
        await editTodoService(id, title)

    } catch (err) {
        dispatch(setErrorAction(err.message));

        if (originalTitle) {
            dispatch(OptimisticHandleSaveEditAction(id, originalTitle))
        }
    }
}

export const handleToggleComplete = (id) => async (dispatch, getState) => {

    const { todos } = getState()
    const currentTodo = todos.todos.find(todo => todo.id === id);
    const newCompletedState = !currentTodo.completed;

    try {

        dispatch(OptimisticHandleToggleAction(id, newCompletedState))

        await toggleTodoService(id, newCompletedState);

    } catch (err) {

        dispatch(setErrorAction(err.message));

        dispatch(OptimisticHandleToggleAction(id, !newCompletedState))

    }
}


export const addTodo = (title) => async (dispatch) => {

    const tempId = Date.now()
    //Создали дело с айди для оптимистичного состояния
    const newTodo = {
        id: tempId,
        title,
        completed: false,
    };

    try {
        //добавили дело с айди временным
        dispatch(addTodoAction(newTodo))

        const saveTodo = await createTodoService(title)

        dispatch(optimisticDeleteAction(tempId))
        dispatch(addTodoAction(saveTodo))

    } catch (err) {

        dispatch(setErrorAction(err.message));
        dispatch(optimisticDeleteAction(tempId))
    }
}

