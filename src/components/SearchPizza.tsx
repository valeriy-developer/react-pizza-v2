import { ChangeEvent, useMemo, useRef, useState } from 'react'
import debounce from 'lodash.debounce'
import IconSearch from './icons/IconSearch'
import IconSearchClear from './icons/IconSearchClear'
import { setSearchValue } from '../redux/slices/filterSlice'
import { useAppDispatch } from '../redux/hooks'

interface IProps {
  wrappedClass?: string
}

const SearchPizza = ({ wrappedClass }: IProps) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const dispatch = useAppDispatch()
  const [value, setValue] = useState('')

  const updateSearchValue = useMemo(
    () =>
      debounce(str => {
        dispatch(setSearchValue(str))
      }, 600),
    [dispatch]
  )

  const onCloseInput = () => {
    dispatch(setSearchValue(''))
    setValue('')
    inputRef.current?.focus()
  }

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
    updateSearchValue(e.target.value)
  }

  return (
    <div className={`search-input ${wrappedClass}`}>
      <div className="search-input__icon">
        <IconSearch />
      </div>
      <input
        ref={inputRef}
        value={value}
        onChange={onChangeInput}
        type="text"
        placeholder="Пошук піци..."
      />
      {value && (
        <button
          onClick={onCloseInput}
          className="search-input__close-icon"
          type="button"
        >
          <IconSearchClear />
        </button>
      )}
    </div>
  )
}

export default SearchPizza

SearchPizza.defaultProps = {
  wrappedClass: null,
}
