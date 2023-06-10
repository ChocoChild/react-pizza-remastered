import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchPizza = createAsyncThunk('pizza/fetchPizzaStatus', async (params) => {
    const { sortBy, order, categoryId, search, currentPage } = params;
    const { data } = await axios.get(`https://646910e803bb12ac20855e11.mockapi.io/pizzaStore?page=${currentPage}&limit=4&${categoryId}&sortBy=${sortBy}&order=${order}${search}`)
    return data;
})

const initialState = {
    items: [],
    status: ''
};

const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {

        setItems(state, action) {
            state.items = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPizza.pending, (state) => {
                state.status = "loading"
                state.items = []
            })
            .addCase(fetchPizza.fulfilled, (state, action) => {
                console.log("Загрузка успешно")
                state.items = action.payload
                state.status = "success"
            })
            .addCase(fetchPizza.rejected, (state) => {
                state.status = "error"
                state.items = []
            })
    }
})

export const { setItems } = pizzaSlice.actions
export default pizzaSlice.reducer