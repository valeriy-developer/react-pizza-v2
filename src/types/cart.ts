export interface ICartItem {
  id: string
  title: string
  price: number
  imgUrl: string
  count: number
  typeItem: string
  sizeItem: number
}

export interface ICartSlice {
  totalPrice: number
  items: ICartItem[]
}
