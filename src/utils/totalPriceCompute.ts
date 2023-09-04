import { ICartItem } from '../types/cart'

const totalPriceCompute = (items: ICartItem[]) => {
  return items.reduce((sum, obj) => obj.price * obj.count + sum, 0)
}

export default totalPriceCompute
