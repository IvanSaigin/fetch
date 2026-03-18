export const todoOptimisticReducer = (state, action) => {

    switch (action.type) {
        case 'toggle':
            return state.map(todo =>
                todo.id === action.id
                    ? { ...todo, completed: action.completed }
                    : todo
            );

        case 'addTodo':
            return [...state, action.newTodo];

        case 'deleteTodo':
            return state.filter(todo => todo.id !== action.id);

        case 'changeTodo':
            return state.map(todo =>
                todo.id === action.id
                    ? { ...todo, title: action.title }
                    : todo
            );

        default:
            return state;
    }
};