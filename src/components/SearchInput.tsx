import { ChangeEvent, useMemo, useRef, useState } from 'react'
import debounce from 'lodash.debounce'
import IconSearch from './icons/IconSearch'
import IconSearchClear from './icons/IconSearchClear'
import { setSearchValue } from '../redux/slices/filterSlice'
import { useAppDispatch } from '../redux/hooks'

const SearchInput = () => {
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
    <div className="input-wrapper">
      <div className="input__search-icon">
        <IconSearch />
      </div>
      <input
        ref={inputRef}
        value={value}
        onChange={onChangeInput}
        type="text"
        className="input"
        placeholder="Пошук піци..."
      />
      {value && (
        <button
          onClick={onCloseInput}
          className="input__close-icon"
          type="button"
        >
          <IconSearchClear />
        </button>
      )}
    </div>
  )
}

export default SearchInput
