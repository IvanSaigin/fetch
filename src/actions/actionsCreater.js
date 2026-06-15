import { ACTION_TYPE } from './actionstype'

export const setTodosAction = (data) => ({
    type: ACTION_TYPE.SET_TODOS,
    payload: data
})

export const setErrorAction = (massage) => ({
    type: ACTION_TYPE.SET_ERROR,
    payload: massage
})

export const setLoadingAction = (bool) => ({
    type: ACTION_TYPE.SET_LOADING,
    payload: bool
})

export const optimisticDeleteAction = (id) => ({
    type: ACTION_TYPE.DELETE_OPTOMOSTIC_TODO,
    payload: id
})

export const restoreTodoAction = (items) => ({
    type: ACTION_TYPE.RESTORE_TODO,
    payload: items
})

export const OptimisticHandleSaveEditAction = (id, title) => ({
    type: ACTION_TYPE.EDIT_OPTIMISTIC_TODO,
    payload: { id, title }
})

export const OptimisticHandleToggleAction = (id, status) => ({
    type: ACTION_TYPE.TOGGLE_OPTIMISTIC_TODO,
    payload: { id, status }
})

export const addTodoAction = (newTodo) => ({
    type: ACTION_TYPE.ADD_OPTIMISTIC_TODO,
    payload: newTodo
})

export const setSearchTermAction = (term) => ({
    type: ACTION_TYPE.SET_SEARCH_TERM,
    payload: term
})

export const setDebouncedSearchTermAction = (term) => ({
    type: ACTION_TYPE.SET_DEBOUNCED_SEARCH,
    payload: term
})

export const setSortEnabledAction = (enabled) => ({
    type: ACTION_TYPE.SET_SORT_ENABLED,
    payload: enabled
})
export const setSortOrderAction = (order) => ({
    type: ACTION_TYPE.SET_SORT_ORDER,
    payload: order
})