import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IFiltersSlice } from '../../types/filters'
import { ISort } from '../../types'

const initialState: IFiltersSlice = {
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
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload
    },

    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload
    },

    setSort(state, action: PayloadAction<ISort>) {
      state.sort = action.payload
    },

    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload
    },

    setTotalPages(state, action: PayloadAction<number>) {
      state.totalPages = action.payload
    },

    setFilters(state, action: PayloadAction<IFiltersSlice>) {
      if (Object.keys(action.payload).length) {
        state.sort = action.payload.sort
        state.currentPage = Number(action.payload.currentPage)
        state.categoryId = Number(action.payload.categoryId)
      } else {
        state.currentPage = 1
        state.categoryId = 0
        state.sort = {
          name: 'популярністю',
          sortProperty: 'rating',
        }
      }
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
