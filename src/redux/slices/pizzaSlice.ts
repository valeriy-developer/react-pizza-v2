import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { IPizza, IFetchedPizza, IPizzasSlice } from '../../types/pizza'

export const fetchPizzas = createAsyncThunk<IPizza[], IFetchedPizza>(
  'pizza/fetchPizzasStatus',
  async (params: IFetchedPizza) => {
    const { limit, currentPage, searchValue, categoryId, sortType } = params

    const { data } = await axios.get(
      `http://localhost:5001/api/pizzas?limit=${limit}&page=${currentPage}${
        searchValue ? `&search=${searchValue}` : ''
      }${categoryId > 0 ? `&filter=${categoryId}` : ''}&sort=${sortType}`
    )

    return data
  }
)

const initialState: IPizzasSlice = {
  items: [],
  status: 'loading',
}

export const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload
    },
  },

  extraReducers: builder => {
    builder.addCase(fetchPizzas.pending, state => {
      state.status = 'loading'
      state.items = []
      console.log('Йде відправлення запиту')
    })
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload.pizzas
      state.status = 'success'
      console.log('Запит отримано')
    })
    builder.addCase(fetchPizzas.rejected, state => {
      state.status = 'error'
      state.items = []
      console.log('Помилка запиту')
    })
  },
})

export const { setItems } = pizzaSlice.actions

export default pizzaSlice.reducer
