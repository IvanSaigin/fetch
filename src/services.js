import * as api from './api';

export const getTodos = async (params) => {
    return api.getTodos(params);
};

export const createTodoService = async (title) => {
    if (!title.trim()) throw new Error('Введите значение');

    return api.createTodo(title);
};

export const toggleTodoService = async (id, completed) => {
    return api.updateTodo(id, { completed });
};

export const editTodoService = async (id, title) => {
    return api.updateTodo(id, { title });
};

export const deleteTodoService = async (id) => {
    return api.deleteTodo(id);
};