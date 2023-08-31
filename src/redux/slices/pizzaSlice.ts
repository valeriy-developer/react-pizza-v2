import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { IPizza, IPizzasSlice, Status } from '../../types/pizza'
import { IFetchPizza } from '../../types'

const initialState: IPizzasSlice = {
  items: [],
  status: Status.LOADING,
}

export const fetchPizzas = createAsyncThunk<IPizza[], IFetchPizza>(
  'pizza/fetchPizzasStatus',
  async params => {
    const {
      limit,
      currentPage,
      totalPages,
      searchValue,
      categoryId,
      sortType,
    } = params

    const { data } = await axios.get<{
      currentPage: number
      totalPages: number
      pizzas: IPizza[]
    }>(
      `http://localhost:5001/api/pizzas?limit=${limit}&totalPages=${totalPages}&page=${currentPage}${
        searchValue ? `&search=${searchValue}` : ''
      }${categoryId > 0 ? `&filter=${categoryId}` : ''}&sort=${sortType}`
    )

    return data.pizzas
  }
)

export const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<IPizza[]>) {
      state.items = action.payload
    },
  },

  extraReducers: builder => {
    builder.addCase(fetchPizzas.pending, state => {
      state.status = Status.LOADING
      state.items = []
    })
    builder.addCase(
      fetchPizzas.fulfilled,
      (state, action: PayloadAction<IPizza[]>) => {
        state.items = action.payload
        state.status = Status.SUCCESS
      }
    )
    builder.addCase(fetchPizzas.rejected, state => {
      state.status = Status.ERROR
      state.items = []
    })
  },
})

export const { setItems } = pizzaSlice.actions

export default pizzaSlice.reducer
