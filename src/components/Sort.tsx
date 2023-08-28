import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import IconArrowUp from './icons/IconArrowUp'
import IconArrowDown from './icons/IconArrowDown'
import { setSort } from '../redux/slices/filterSlice'

export const sortList: { name: string; sortProperty: string }[] = [
  {
    name: 'популярністю',
    sortProperty: 'rating',
  },
  {
    name: 'ціною',
    sortProperty: 'price',
  },
  {
    name: 'алфавітом',
    sortProperty: 'title',
  },
]

const Sort: React.FC = () => {
  const dispatch = useDispatch()
  const sort = useSelector((state: any) => state.filter.sort)
  const [popupOpened, setPopupOpened] = useState(false)
  const sortRef = useRef<HTMLDivElement>(null)

  const openPopup = () => {
    setPopupOpened(!popupOpened)
  }

  const selectActiveItems = (obj: any) => {
    dispatch(setSort(obj))
    setPopupOpened(false)
  }

  useEffect(() => {
    const outsideClick = (e: any) =>
      !e.composedPath().includes(sortRef.current) ? setPopupOpened(false) : null

    document.body.addEventListener('click', outsideClick)

    return () => {
      document.body.removeEventListener('click', outsideClick)
    }
  }, [])

  return (
    <div ref={sortRef} className="sort">
      <button onClick={openPopup} className="sort__btn" type="button">
        <span className="sort__arrow">
          {popupOpened ? <IconArrowUp /> : <IconArrowDown />}
        </span>
        <p className="sort__show-text">
          Сортування за:
          <span className="sort__name">{sort.name}</span>
        </p>
      </button>
      {popupOpened && (
        <ul className="sort__popup">
          {sortList.map(obj => {
            return (
              <li key={obj.sortProperty} className="sort__item">
                <button
                  className={
                    obj.sortProperty === sort.sortProperty
                      ? 'sort__item-btn sort__item-btn--active'
                      : 'sort__item-btn'
                  }
                  onClick={() => selectActiveItems(obj)}
                  type="button"
                >
                  {obj.name}
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

export default Sort
