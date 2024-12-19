import { Control, UseFormRegister, useWatch } from 'react-hook-form'
import { useEffect, useState } from 'react'
import axios from 'axios'
import classNames from 'classnames'
import Input from './Input'
import { IAreaData, ICityNovaPoshta, IClickedCity, IForm } from '../types'
import City from './City'

interface IProps {
  control: Control<IForm>
  register: UseFormRegister<IForm>
  isInvalid: boolean
  changeCityValue: (
    name: 'city' | 'phone' | 'email' | 'department',
    value: string
  ) => void
  clickedCity: IClickedCity
  setClickedCity: React.Dispatch<React.SetStateAction<IClickedCity>>
  wrappedClassName?: string
}

export const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

const getCities = async (value: string) => {
  const { data } = await axios.post<IAreaData>(
    `https://api.novaposhta.ua/v2.0/json/`,
    {
      apiKey: `${import.meta.env.VITE_NOVA_POSHTA_API_KEY}`,
      modelName: 'Address',
      calledMethod: 'getCities',
      methodProperties: {
        Page: '1',
        Limit: '20',
        FindByString: value,
      },
    }
  )

  const newData: ICityNovaPoshta[] = data.data.map(item => {
    return {
      cityName: item.Description,
      province: item.AreaDescription,
      cityRef: item.Ref,
    }
  })

  return newData
}

const SearchCity = ({
  control,
  register,
  isInvalid,
  changeCityValue,
  clickedCity,
  setClickedCity,
  wrappedClassName,
}: IProps) => {
  const cityValue = useWatch({ control, name: 'city' })
  const [isModalOpened, setIsModalOpened] = useState<boolean>(false)
  const [cities, setCities] = useState<ICityNovaPoshta[]>([])

  const debouncedCityValue = useDebounce(cityValue, 350)

  const onClickCity = (text: string, ref: string) => {
    changeCityValue('city', text)
    setClickedCity({ cityName: text, cityRef: ref })
  }

  const swapToInput = () => {
    setClickedCity({ cityName: '', cityRef: '' })
    changeCityValue('city', '')
    changeCityValue('department', '')
  }

  const onChangeFocus = (isFocused: boolean) => {
    setIsModalOpened(isFocused)
  }

  useEffect(() => {
    if (!debouncedCityValue) {
      setCities([])
      return
    }

    const asyncGetCities = async () => {
      try {
        const data = await getCities(debouncedCityValue)
        setCities(data)
      } catch (error) {
        console.error('Error fetching cities:', error)
      }
    }

    asyncGetCities()
  }, [debouncedCityValue])

  return (
    <div className={classNames('search-city', wrappedClassName)}>
      <div className="search-city__wrapper">
        {clickedCity.cityName === '' ? (
          <Input
            {...register('city', {
              required: true,
            })}
            text="Назва міста..."
            control={control}
            isInvalid={isInvalid}
            wrappedClassName="search-city__input"
            focusChanged={onChangeFocus}
            autocomplete="off"
          />
        ) : (
          <button
            type="button"
            className="search-city__city-name"
            onClick={swapToInput}
          >
            {clickedCity.cityName}
          </button>
        )}
      </div>
      {cities.length > 0 && (
        <div
          className={`search-city__modal ${
            isModalOpened && 'search-city__modal--active'
          }`}
        >
          {cities.map(el => {
            return (
              <ul key={el.cityName} className="search-city__list">
                <City
                  cityName={el.cityName}
                  cityRef={el.cityRef}
                  province={el.province}
                  handleClick={onClickCity}
                />
              </ul>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default SearchCity

SearchCity.defaultProps = {
  wrappedClassName: '',
}
