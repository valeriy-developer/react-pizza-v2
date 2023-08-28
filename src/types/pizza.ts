export interface IPizza {
  id?: string
  title?: string
  imgUrl?: string
  price?: number
  size?: { 0: number; 1: number }[]
  category?: number
  rating?: number
  types?: { 0: number; 1: number }[]
}

export interface IFetchedPizza {
  limit: number
  currentPage: number
  searchValue: string
  categoryId: number
  sortType: string
  totalPages: number
}

export interface IPizzasSlice {
  items: IPizza[]
  status: string
}
