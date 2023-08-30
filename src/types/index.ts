export interface ISort {
  name: string
  sortProperty: 'rating' | 'price' | 'title'
}

export interface IFetchPizza {
  limit: number
  currentPage: number
  searchValue: string
  categoryId: number
  sortType: ISort
  totalPages: number
}
