import { createSlice } from '@reduxjs/toolkit'
import { IFiltersParams } from '../../types'

const initialState: IFiltersParams = {
  searchValue: '',
  categoryId: 0,
  currentPage: 1,
  totalPages: 0,
  sort: {
    name: 'популярністю',
    sortProperty: 'rating',
  },
}

export const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategoryId(state, action) {
      state.categoryId = action.payload
    },

    setSearchValue(state, action) {
      state.searchValue = action.payload
    },

    setSort(state, action) {
      state.sort = action.payload
    },

    setCurrentPage(state, action) {
      state.currentPage = action.payload
    },

    setTotalPages(state, action) {
      state.totalPages = action.payload
    },

    setFilters(state, action) {
      state.sort = action.payload.sort
      state.currentPage = Number(action.payload.currentPage)
      state.categoryId = Number(action.payload.categoryId)
    },
  },
})

export const {
  setCategoryId,
  setSort,
  setCurrentPage,
  setTotalPages,
  setFilters,
  setSearchValue,
} = filterSlice.actions

export default filterSlice.reducer
