import { createSlice } from "@reduxjs/toolkit"

const initialState = {
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
export const { sortCategoryId, setSort, setCurrentPage, setFilters } = filterSlice.actions;
export default filterSlice.reducer;