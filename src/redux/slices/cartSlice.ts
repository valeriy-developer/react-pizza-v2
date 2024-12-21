import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { ICartItem, ICartSlice } from '../../types/cart'
import getLocalCart from '../../utils/getLocalCart'
import totalPriceCompute from '../../utils/totalPriceCompute'

const { items, totalPrice } = getLocalCart()

const initialState: ICartSlice = {
  totalPrice,
  items,
}

const getItemKey = (item: ICartItem): string =>
  `${item.id}_${item.sizeItem}_${item.typeItem}`

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<ICartItem>) {
      const itemKey = getItemKey(action.payload)
      const findItem = state.items.find(obj => getItemKey(obj) === itemKey)

      if (findItem) {
        findItem.count++
      } else {
        state.items.push({ ...action.payload, count: 1 })
      }

      state.totalPrice = totalPriceCompute(state.items)
    },
    plusItem(state, action: PayloadAction<ICartItem>) {
      const itemKey = getItemKey(action.payload)
      const findItem = state.items.find(obj => getItemKey(obj) === itemKey)

      if (findItem) {
        findItem.count++
      }

      state.totalPrice = totalPriceCompute(state.items)
    },
    minusItem(state, action: PayloadAction<ICartItem>) {
      const itemKey = getItemKey(action.payload)
      const findItem = state.items.find(obj => getItemKey(obj) === itemKey)

      if (findItem) {
        findItem.count--
        if (findItem.count === 0) {
          state.items = state.items.filter(obj => getItemKey(obj) !== itemKey)
        }
      }

      state.totalPrice = totalPriceCompute(state.items)
    },
    removeItem(state, action: PayloadAction<ICartItem>) {
      const itemKey = getItemKey(action.payload)
      state.items = state.items.filter(obj => getItemKey(obj) !== itemKey)

      state.totalPrice = totalPriceCompute(state.items)
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
