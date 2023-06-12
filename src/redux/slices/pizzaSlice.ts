import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchPizza = createAsyncThunk<PizzaItem[], Record<string, string>>('pizza/fetchPizzaStatus', async (params) => {
    const { sortBy, order, categoryId, search, currentPage } = params;
    const { data } = await axios.get(`https://646910e803bb12ac20855e11.mockapi.io/pizzaStore?page=${currentPage}&limit=4&${categoryId}&sortBy=${sortBy}&order=${order}${search}`)
    return data;
})

type PizzaItem = {
    id: string,
    title: string,
    imageUrl: string,
    types: number[],
    sizes: number[],
    price: number
}

enum Status {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error',
}

interface PizzaSlice {
    items: PizzaItem[],
    status: Status
}

const initialState: PizzaSlice = {
    items: [],
    status: Status.LOADING
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
                state.status = Status.LOADING
                state.items = []
            })
            .addCase(fetchPizza.fulfilled, (state, action) => {
                state.items = action.payload
                state.status = Status.SUCCESS
            })
            .addCase(fetchPizza.rejected, (state) => {
                state.status = Status.ERROR
                state.items = []
            })
    }
})

export const { setItems } = pizzaSlice.actions
export default pizzaSlice.reducer