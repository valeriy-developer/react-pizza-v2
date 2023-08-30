import { ISort } from '.'

export interface IFiltersSlice {
  searchValue: string
  categoryId: number
  currentPage: number
  totalPages: number
  sort: ISort[] | ISort
}
