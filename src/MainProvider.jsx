import { createContext, useContext } from "react";
import { useTodos } from "./useTodos";

export const TodoContext = createContext()

export const useProvider = () => {
    return useContext(TodoContext)
}

export const Provider = ({ children }) => {

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

    return (
        <TodoContext.Provider value={{
            todos,
            loading,
            error,
            loadTodos,
            addTodo,
            handleToggleComplete,
            DeleteTodo,
            handleSaveEdit
        }}>
            {children}
        </TodoContext.Provider>
    )
}