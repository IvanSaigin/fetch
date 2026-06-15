import { ACTION_TYPE } from "../actions/actionstype"

const initialState = {
    todos: [],
    loading: false,
    error: null
}

export const todoReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case ACTION_TYPE.SET_ERROR:
            return {
                ...state,
                error: payload
            }

        case ACTION_TYPE.SET_LOADING:
            return {
                ...state,
                loading: payload
            }

        case ACTION_TYPE.SET_TODOS:
            return {
                ...state,
                todos: payload
            }

        case ACTION_TYPE.ADD_OPTIMISTIC_TODO:
            return {
                ...state,
                todos: [...state.todos, payload]
            }

        case ACTION_TYPE.DELETE_OPTOMOSTIC_TODO:
            return {
                ...state,
                todos: state.todos.filter(todo => todo.id !== payload)
            }

        case ACTION_TYPE.RESTORE_TODO:
            return {
                ...state,
                todos: [...state.todos, payload]  // ← Было state.items, исправил на state.todos
            }

        case ACTION_TYPE.EDIT_OPTIMISTIC_TODO:
            return {
                ...state,
                // Убрал фигурные скобки — теперь работает
                todos: state.todos.map((todo) =>
                    todo.id === payload.id ? { ...todo, title: payload.title } : todo
                )
            }

        case ACTION_TYPE.TOGGLE_OPTIMISTIC_TODO:
            return {
                ...state,
                // Тут было правильно, но для единообразия тоже без скобок
                todos: state.todos.map((todo) =>
                    todo.id === payload.id ? { ...todo, completed: payload.status } : todo
                )
            }

        default:
            return state
    }
}