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
  category: number
  id: string
  imgUrl: string
  price: number
  rating: number
  size: Array<number>
  title: string
  // type: []
  types: Array<number>
}
