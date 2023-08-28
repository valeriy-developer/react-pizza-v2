import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import qs from 'qs'
import Filter from '../components/Filter'
import Item from '../components/Item'
import SkeletonItem from '../components/SkeletonItem'
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

const Home = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isSearch = useRef(false)
  const isMounted = useRef(false)

  const { items, status } = useSelector((state: any) => state.pizza)
  const { categoryId, sort, currentPage, totalPages, searchValue } =
    useSelector((state: any) => state.filter)

  const sortType = sort.sortProperty
  const limit = 4

  const getPizzas = async () => {
    const data = dispatch(
      fetchPizzas({
        limit,
        currentPage,
        searchValue,
        categoryId,
        sortType,
        totalPages,
      })
    )

    dispatch(setTotalPages(data.payload.totalPages))
  }

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortType,
        categoryId,
        currentPage,
        limit,
        totalPages,
      })

      navigate(`?${queryString}`)
    }

    isMounted.current = true
  }, [categoryId, sortType, currentPage, totalPages, navigate])

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1))
      const newSort = sortList.find(obj => obj.sortProperty === params.sortType)
      dispatch(setFilters({ ...params, newSort }))
      isSearch.current = true
    }
  }, [dispatch])

  useEffect(() => {
    window.scrollTo(0, 0)

    getPizzas()

    isSearch.current = false
  }, [categoryId, sortType, searchValue, currentPage])

  const pizzas = items.map((el, id: number) => {
    return <Item key={id} {...el} />
  })

  const skeletons = [...new Array(10)].map(() => {
    return <SkeletonItem key={Math.random()} />
  })

  const onClickCategory = (id: number) => {
    dispatch(setCategoryId(id))
    dispatch(setCurrentPage(1))
  }

  const fetchStatus = () => {
    if (status === 'error') {
      return <ErrorPage />
    }

    if (status === 'loading') {
      return skeletons
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
