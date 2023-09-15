import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { ICartItem, ICartSlice } from '../../types/cart'
import getLocalCart from '../../utils/getLocalCart'
import totalPriceCompute from '../../utils/totalPriceCompute'

const { items, totalPrice } = getLocalCart()

const initialState: ICartSlice = {
  totalPrice,
  items,
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<ICartItem>) {
      const findItem = state.items.find(obj => obj.id === action.payload.id)

      if (findItem) {
        findItem.count++
      } else {
        state.items.push({ ...action.payload, count: 1 })
      }

      state.totalPrice = totalPriceCompute(state.items)
    },
    plusItem(state, action: PayloadAction<string>) {
      const findItem = state.items.find(obj => obj.id === action.payload)

      if (findItem) {
        findItem.count++
      }

      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum
      }, 0)
    },
    minusItem(state, action: PayloadAction<string>) {
      const findItem = state.items.find(obj => obj.id === action.payload)

      if (findItem) {
        findItem.count--
      }

      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count - sum
      }, 0)
    },
    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter(obj => obj.id !== action.payload)

      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum
      }, 0)
    },
    clearItems(state) {
      state.items = []
      state.totalPrice = 0
    },
  },
})

export const { addItem, removeItem, clearItems, plusItem, minusItem } =
  cartSlice.actions

export default cartSlice.reducer
