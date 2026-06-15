
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { selectSearchTerm, selectSortEnabled, selectSortOrder } from '../../selectors'
import { setSearchTermAction, setSortOrderAction, setSortEnabledAction, setDebouncedSearchTermAction } from '../../actions/actionsCreater'

const SearchSectrion = () => {

    const dispatch = useDispatch()
    const searchTerm = useSelector(selectSearchTerm)
    const sortEnabled = useSelector(selectSortEnabled)
    const sortOrder = useSelector(selectSortOrder)

    useEffect(() => {
        const timer = setTimeout(() => {
            dispatch(setDebouncedSearchTermAction(searchTerm))
        }, 500)

        return () => clearTimeout(timer)
    }, [searchTerm, dispatch])



    const setSort = (e) => {

        if (sortOrder) {
            dispatch(setSortOrderAction(''))
            dispatch(setSortEnabledAction(e))
            return
        }

        dispatch(setSortOrderAction('asc'))
        dispatch(setSortEnabledAction(e))
    }

    const handleSearchChange = (value) => {
        dispatch(setSearchTermAction(value))
    }

    const clearSearch = () => {
        dispatch(setSearchTermAction(''))
    }

    const handleSortOrderChange = (order) => {
        dispatch(setSortOrderAction(order))
    }



    return <div className="search-section">
        <div className="search-wrapper">
            <input
                type="text"
                placeholder="Поиск задач..."
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="search-input"
            />

            <button
                className="clear-search"
                onClick={clearSearch}
            >
                ✕
            </button>

        </div>

        <div className="sort-controls">
            <label className="sort-label">
                <input
                    type="checkbox"
                    checked={sortEnabled}
                    onChange={(e) => setSort(e.target.checked)}
                />
                Сортировать по алфавиту
            </label>


            <div className="sort-buttons">
                <button
                    className={`sort-btn ${sortOrder === 'asc' ? 'active' : ''}`}
                    onClick={() => handleSortOrderChange('asc')}
                    disabled={!sortEnabled}
                >
                    ↑ А-Я
                </button>
                <button
                    className={`sort-btn ${sortOrder === 'desc' ? 'active' : ''}`}
                    onClick={() => handleSortOrderChange('desc')}
                    disabled={!sortEnabled}
                >
                    ↓ Я-А
                </button>
            </div>

        </div>
    </div>
}
export default SearchSectrion