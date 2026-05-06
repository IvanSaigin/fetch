import { useSearchContext } from "../../SearchProvider"
const SearchSectrion = () => {

    const { searchTerm, setSearchTerm, sortEnabled, setSort, sortOrder, setSortOrder, setSortEnabled } = useSearchContext()

    return <div className="search-section">
        <div className="search-wrapper">
            <input
                type="text"
                placeholder="Поиск задач..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
            />

            <button
                className="clear-search"
                onClick={() => setSearchTerm('')}
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
                    onClick={() => setSortOrder('asc')}
                    disabled={!sortEnabled}
                >
                    ↑ А-Я
                </button>
                <button
                    className={`sort-btn ${sortOrder === 'desc' ? 'active' : ''}`}
                    onClick={() => setSortOrder('desc')}
                    disabled={!sortEnabled}
                >
                    ↓ Я-А
                </button>
            </div>

        </div>
    </div>
}
export default SearchSectrion