import { createSlice } from "@reduxjs/toolkit"

const initialState = {
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
            state.sort = action.payload
        },

        setCurrentPage(state, action) {
            state.currentPage = action.payload
        },

    }
})
export const { sortCategoryId, setSort, setCurrentPage } = filterSlice.actions;
export default filterSlice.reducer;