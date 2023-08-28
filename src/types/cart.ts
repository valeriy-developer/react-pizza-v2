import { IPizza } from './pizza'

export interface ICartSlice {
  totalPrice: number
  items: IPizza[]
}
