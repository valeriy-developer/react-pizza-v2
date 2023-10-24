import { Control, UseFormRegister, useWatch } from 'react-hook-form'
import { useCallback, useEffect, useState, useMemo } from 'react'
import axios from 'axios'
import debounce from 'lodash.debounce'
import Input from './Input'
import { IAreaData, IDataNovaPoshta, IForm } from '../types'
import City from './City'

interface IProps {
  control: Control<IForm>
  register: UseFormRegister<IForm>
  isInvalid: boolean
  changeCityValue: (name: 'city' | 'phone' | 'email', value: string) => void
}

const SearchCity = ({
  control,
  register,
  isInvalid,
  changeCityValue,
}: IProps) => {
  const [cities, setCities] = useState<IDataNovaPoshta[]>([])
  const cityValue = useWatch({ control, name: 'city', defaultValue: '' })
  const [clickedCity, setClickedCity] = useState<string>('')
  const [isModalOpened, setIsModalOpened] = useState<boolean>(false)

  const getDataNovaPoshta = useCallback(async () => {
    const { data } = await axios.post<IAreaData>(
      `https://api.novaposhta.ua/v2.0/json/`,
      {
        apiKey: `${import.meta.env.VITE_NOVA_POSHTA_API_KEY}`,
        modelName: 'Address',
        calledMethod: 'getCities',
        methodProperties: {
          Page: '1',
          Limit: '20',
          FindByString: cityValue,
        },
      }
    )

    const newData: IDataNovaPoshta[] = data.data.map(item => {
      return {
        cityName: item.Description,
        province: item.AreaDescription,
      }
    })

    setCities(newData)
  }, [cityValue])

  const debouncedGetDataNovaPoshta = useMemo(
    () =>
      debounce(() => {
        getDataNovaPoshta()
      }, 600),
    [getDataNovaPoshta]
  )

  useEffect(() => {
    debouncedGetDataNovaPoshta()
  }, [cityValue, debouncedGetDataNovaPoshta])

  const onClickCity = (text: string) => {
    setClickedCity(text)
    changeCityValue('city', text)
    // setIsModalOpened(false)
  }

  const swapToInput = () => {
    setClickedCity('')
    changeCityValue('city', '')
    // setIsModalOpened(false)
  }

  const onChangeFocus = (isFocused: boolean) => {
    setTimeout(() => {
      setIsModalOpened(isFocused)
    }, 100)
  }

  return (
    <div className="search-city">
      <div className="search-city__wrapper">
        {clickedCity === '' ? (
          <Input
            {...register('city', { required: true })}
            text="Назва міста..."
            control={control}
            isInvalid={isInvalid}
            className="search-city__input"
            focusChanged={onChangeFocus}
            autocomplete="off"
          />
        ) : (
          <button
            type="button"
            className="search-city__city-name"
            onClick={swapToInput}
          >
            {clickedCity}
          </button>
        )}
      </div>
      <div
        className={`search-city__modal ${
          isModalOpened && 'search-city__modal--active'
        }`}
      >
        <ul className="search-city__list">
          {cities.map(el => {
            return (
              <City
                key={el.cityName}
                cityName={el.cityName}
                province={el.province}
                handleClick={onClickCity}
              />
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default SearchCity
