import { Control, UseFormRegister, useWatch } from 'react-hook-form'
import { useCallback, useEffect, useState, useMemo } from 'react'
import axios from 'axios'
import debounce from 'lodash.debounce'
import Input from './Input'
import { IAreaData, ICityNovaPoshta, IClickedCity, IForm } from '../types'
import City from './City'

interface IProps {
  control: Control<IForm>
  register: UseFormRegister<IForm>
  isInvalid: boolean
  changeCityValue: (name: 'city' | 'phone' | 'email', value: string) => void
  cities: ICityNovaPoshta[]
  setCities: React.Dispatch<React.SetStateAction<ICityNovaPoshta[]>>
  clickedCity: IClickedCity
  setClickedCity: React.Dispatch<React.SetStateAction<IClickedCity>>
}

const SearchCity = ({
  control,
  register,
  isInvalid,
  changeCityValue,
  cities,
  setCities,
  clickedCity,
  setClickedCity,
}: IProps) => {
  const cityValue = useWatch({ control, name: 'city', defaultValue: '' })
  const [isModalOpened, setIsModalOpened] = useState<boolean>(false)

  const getCitiesNovaPoshta = useCallback(async () => {
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

    const newData: ICityNovaPoshta[] = data.data.map(item => {
      return {
        cityName: item.Description,
        province: item.AreaDescription,
        cityRef: item.Ref,
      }
    })

    setCities(newData)
  }, [cityValue, setCities])

  const debouncedGetCitiesNovaPoshta = useMemo(
    () =>
      debounce(() => {
        getCitiesNovaPoshta()
      }, 600),
    [getCitiesNovaPoshta]
  )

  useEffect(() => {
    debouncedGetCitiesNovaPoshta()
  }, [cityValue, debouncedGetCitiesNovaPoshta])

  const onClickCity = (text: string, ref: string) => {
    changeCityValue('city', text)
    setClickedCity({ cityName: text, cityRef: ref })
  }

  const swapToInput = () => {
    setClickedCity({ cityName: '', cityRef: '' })
    changeCityValue('city', '')
  }

  const onChangeFocus = (isFocused: boolean) => {
    setTimeout(() => {
      setIsModalOpened(isFocused)
    }, 100)
  }

  return (
    <div className="search-city">
      <div className="search-city__wrapper">
        {clickedCity.cityName === '' ? (
          <Input
            {...register('city', {
              required: true,
            })}
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
            {clickedCity.cityName}
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
                cityRef={el.cityRef}
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
