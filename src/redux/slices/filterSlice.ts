import { createSlice } from "@reduxjs/toolkit"

type SortSliceItem = {
    name: string
    sortBy: 'rating' | 'price' |  'title' | '-rating' | '-price' |  '-title'
}

interface FilterSlice {
    searchValue: string,
    category: number,
    currentPage: number,
    sort: SortSliceItem
}

const initialState: FilterSlice = {
    searchValue: '',
    category: 0,
    currentPage: 1,
    sort: {
        name: 'популярности',
        sortBy: 'rating',
    }
}

const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        sortCategoryId(state, action) {
            state.category = action.payload;
        },

        setSearchValue(state, action) {
            state.searchValue = action.payload;
        },

        setSort(state, action) {
            state.sort = action.payload;
        },

        setCurrentPage(state, action) {
            state.currentPage = action.payload;
        },

        setFilters(state, action) {
            state.sort = action.payload.sort;
            state.category = Number(action.payload.category);
            state.currentPage = Number(action.payload.currentPage);
        }
    }
})
export const { sortCategoryId, setSort, setCurrentPage, setFilters, setSearchValue } = filterSlice.actions;
export default filterSlice.reducer;