import { combineReducers, createStore, applyMiddleware, compose } from 'redux'
import { thunk } from 'redux-thunk'
import { todoReducer, searchReducer } from './reducers'

const reducer = combineReducers({
    todos: todoReducer,
    search: searchReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)))