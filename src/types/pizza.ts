export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export interface IPizzasSlice {
  items: IPizza[]
  status: Status
}

export interface IPizza {
  id: string
  title: string
  price: number
  imgUrl: string
  types: Array<number>
  size: Array<number>
  category: number
  rating: number
}
