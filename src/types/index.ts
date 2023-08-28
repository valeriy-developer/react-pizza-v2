export interface IFiltersParams {
  searchValue: string
  categoryId: number
  currentPage: number
  totalPages: number
  sort: {
    name: string
    sortProperty: string
  }
}
