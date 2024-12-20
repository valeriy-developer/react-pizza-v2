import { ReactElement, useEffect, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import qs from 'qs'
import Filter from '../components/Filter'
import Item from '../components/Item'
import Pagination from '../components/Pagination'
import {
  setCategoryId,
  setCurrentPage,
  setFilters,
  setTotalPages,
} from '../redux/slices/filterSlice'
import Sort, { sortList } from '../components/Sort'
import { fetchPizzas } from '../redux/slices/pizzaSlice'
import ErrorPage from '../components/ErrorPage'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { IPizza } from '../types/pizza'
import { IFetchPizza } from '../types'
import Loader from '../components/Loader'

const Home = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const isSearch = useRef(false)
  const isMounted = useRef(false)

  const { items, status } = useAppSelector(state => state.pizza)
  const { categoryId, sort, currentPage, totalPages, searchValue } =
    useAppSelector(state => state.filter)

  const sortType: string = sort.sortProperty
  const limit = 8

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortType,
        categoryId,
        currentPage,
        limit,
      })

      navigate(`?${queryString}`)
    }

    isMounted.current = true
  }, [categoryId, sortType, currentPage, navigate])

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(
        window.location.search.substring(1)
      ) as unknown as IFetchPizza

      const newSort = sortList.find(
        obj => String(obj.sortProperty) === String(params.sortType)
      )

      dispatch(
        setFilters({
          searchValue: params.searchValue,
          categoryId: params.categoryId,
          currentPage: params.currentPage,
          totalPages: params.totalPages,
          sort: newSort || sortList[0],
        })
      )

      isSearch.current = true
    }
  }, [dispatch])

  useEffect(() => {
    const getPizzas = async () => {
      const data = await dispatch(
        fetchPizzas({
          limit,
          currentPage,
          searchValue,
          categoryId,
          sortType,
          totalPages,
        })
      )
      const payload = data.payload as IFetchPizza

      dispatch(setTotalPages(payload.totalPages))
    }

    window.scrollTo(0, 0)

    getPizzas()

    isSearch.current = false
  }, [categoryId, sortType, searchValue, currentPage, totalPages, dispatch])

  const pizzas: ReactElement<IPizza>[] = items.map(el => {
    return (<Item key={el.id} {...el} />) as ReactElement<IPizza>
  })

  // const skeletons = [...new Array(10)].map(() => {
  //   return <SkeletonItem key={Math.random()} />
  // })

  const onClickCategory = useCallback(
    (id: number) => {
      dispatch(setCategoryId(id))
      dispatch(setCurrentPage(1))
    },
    [dispatch]
  )

  const fetchStatus = () => {
    if (status === 'error') {
      return <ErrorPage />
    }

    if (status === 'loading') {
      return <Loader />
    }

    return pizzas
  }

  return (
    <section className="home-1">
      <div className="container home-1__wrapper">
        <div className="home-1__line" />
        <div className="home-1__menu">
          <div className="home-1__filter-wrapper">
            <Filter
              value={categoryId}
              onClickCategory={id => onClickCategory(id)}
            />
          </div>
          <div className="home-1__sort-wrapper">
            <Sort />
          </div>
        </div>
        <div className="home-1__content">
          <h2 className="home-1__title">Усі піци</h2>
          <div className="grid home-1__items-wrapper">{fetchStatus()}</div>
          <Pagination
            onChangePage={number => dispatch(setCurrentPage(number))}
            totalPages={totalPages}
            limit={limit}
          />
        </div>
      </div>
    </section>
  )
}

export default Home
