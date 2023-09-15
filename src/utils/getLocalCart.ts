import { ICartSlice } from '../types/cart'
import totalPriceCompute from './totalPriceCompute'

const getLocalCart = (): ICartSlice => {
  const data = localStorage.getItem('cart')
  const items = data ? JSON.parse(data) : []
  const totalPrice = totalPriceCompute(items)

  return {
    items,
    totalPrice,
  }
}

export default getLocalCart
