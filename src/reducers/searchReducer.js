import { ACTION_TYPE } from "../actions/actionstype"

const initialState = {
    searchTerm: '',
    sortEnabled: false,
    sortOrder: '',
    debouncedSearchTerm: ''
}

export const searchReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case ACTION_TYPE.SET_SEARCH_TERM:
            return {
                ...state,
                searchTerm: payload
            }
        case ACTION_TYPE.SET_SORT_ENABLED:
            return {
                ...state,
                sortEnabled: payload
            }
        case ACTION_TYPE.SET_DEBOUNCED_SEARCH:
            return {
                ...state,
                debouncedSearchTerm: payload
            }
        case ACTION_TYPE.SET_SORT_ORDER:
            return {
                ...state,
                sortOrder: payload
            }
        default:
            return state
    }
}
