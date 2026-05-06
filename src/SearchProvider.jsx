import { useState, useEffect, createContext, useContext } from "react"

const SearchContext = createContext()

export const useSearchContext = () => {
    return useContext(SearchContext)
}

export const SearchProvider = ({ children }) => {

    const [searchTerm, setSearchTerm] = useState('')
    const [sortEnabled, setSortEnabled] = useState(false)
    const [sortOrder, setSortOrder] = useState('')
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm)
        }, 500)

        return () => clearTimeout(timer)
    }, [searchTerm])



    const setSort = (e) => {

        if (sortOrder) {
            setSortOrder('')
            setSortEnabled(e)
            return
        }

        setSortOrder('asc')
        setSortEnabled(e)
    }

    return (
        <SearchContext.Provider value={{
            searchTerm,
            setSearchTerm,
            sortEnabled,
            setSortEnabled,
            sortOrder,
            setSortOrder,
            setSort,
            debouncedSearchTerm
        }}>
            {children}
        </SearchContext.Provider>
    )
}