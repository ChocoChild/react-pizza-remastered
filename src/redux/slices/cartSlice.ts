import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { getCartFromLS } from "../../utils/getCartFromLS"
import { calcTotalPrice } from "../../utils/calcTotalPrice"

export type CartItemSlice = {
    id: string,
    title: string,
    price: number,
    imageUrl: string,
    size: number,
    type: string,
    count: number,
}

interface CartSlice {
    totalPrice: number,
    items: CartItemSlice[]
}

const {items, totalPrice} = getCartFromLS()

const initialState: CartSlice = {
    totalPrice: totalPrice,
    items: items
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action: PayloadAction<CartItemSlice>) {
            const findItem = state.items.find((obj) => obj.id === action.payload.id)

            if (findItem) {
                findItem.count++;
            } else {
                state.items.push({
                    ...action.payload,
                    count: 1,
                });
            }
            state.totalPrice = calcTotalPrice(state.items)
        },
        minusItem(state, action) {
            const findItem = state.items.find((obj) => obj.id === action.payload)

            if (findItem) {
                findItem.count--
            }
        },

        removeItem(state, action) {
            state.items = state.items.filter((obj) => obj.id !== action.payload)
        },

        clearItem(state) {
            state.items = []
        }
    }
})

export const { addItem, removeItem, clearItem, minusItem } = cartSlice.actions
export default cartSlice.reducer