const SearchSectrion = ({
    searchTerm,
    sortEnabled,
    sortOrder,
    handleSearchChange,
    handleClearSearch,
    handleSortToggle,
    handleSortOrderChange
}) => {
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
                onClick={() => handleClearSearch('')}
            >
                ✕
            </button>

        </div>

        <div className="sort-controls">
            <label className="sort-label">
                <input
                    type="checkbox"
                    checked={sortEnabled}
                    onChange={(e) => handleSortToggle(e.target.checked)}
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