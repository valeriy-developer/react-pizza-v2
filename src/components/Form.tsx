import { SubmitHandler, useForm } from 'react-hook-form'
import { useContext, useState, useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Button from './Button'
import Input from './Input'
import {
  IClickedCity,
  IDepartmentNovaPoshta,
  IDepartmentsData,
  IForm,
} from '../types'
import { email, phone } from '../constants/regex'
import Modal from './Modal'
import { FormContext } from '../context/FormContextProvider'
import removeLocalCart from '../utils/removeLocalCart'
import { useAppDispatch } from '../redux/hooks'
import { clearItems } from '../redux/slices/cartSlice'
import SearchCity from './SearchCity'
import SelectDepartment from './SelectDepartment'

const Form = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
    setValue,
    watch,
  } = useForm<IForm>({
    mode: 'all',
    defaultValues: {
      city: '',
      email: '',
      phone: '',
      department: '',
    },
  })

  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { setFormOpened, setCompleteModalOpened, completeModalOpened } =
    useContext(FormContext)
  const [clickedCity, setClickedCity] = useState<IClickedCity>({
    cityName: '',
    cityRef: '',
  })
  const [departments, setDepartments] = useState<IDepartmentNovaPoshta[]>([])

  const getDepartmentNovaPoshta = useCallback(async () => {
    const { data } = await axios.post<IDepartmentsData>(
      `https://api.novaposhta.ua/v2.0/json/`,
      {
        apiKey: `${import.meta.env.VITE_NOVA_POSHTA_API_KEY}`,
        modelName: 'Address',
        calledMethod: 'getWarehouses',
        methodProperties: {
          CityRef: clickedCity.cityRef,
          Page: '1',
          Limit: '50',
          Language: 'UA',
        },
      }
    )

    const newData: IDepartmentNovaPoshta[] = data.data.map(item => ({
      department: item.Description,
      departmentRef: item.Ref,
      cityRef: item.CityRef,
    }))

    setDepartments(newData)
  }, [clickedCity.cityRef])

  const department = watch('department')

  const onSubmit: SubmitHandler<IForm> = data => {
    if (data) {
      setFormOpened(false)
      setTimeout(() => {
        setCompleteModalOpened(true)
        dispatch(clearItems())
        removeLocalCart()
      }, 0)
    }

    console.log(data)
  }

  const closeHandler = () => {
    setFormOpened(false)
    setCompleteModalOpened(false)
  }

  const backHome = () => {
    navigate('/')
    setCompleteModalOpened(false)
    document.body.classList.remove('scroll-fixed')
  }

  useEffect(() => {
    if (clickedCity.cityName) {
      getDepartmentNovaPoshta()
    }
    setDepartments([])
  }, [clickedCity, getDepartmentNovaPoshta])

  return (
    <>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form__content-wrapper">
          <Input
            {...register('email', { required: true, pattern: email })}
            text="Введіть електронну адресу..."
            control={control}
            isInvalid={!!errors.email}
            wrappedClassName="form__input"
          />
          <Input
            {...register('phone', { required: true, pattern: phone })}
            text="Введіть номер моб. телефону..."
            control={control}
            isInvalid={!!errors.phone}
            wrappedClassName="form__input"
          />
          <div className="form__group-btns">
            <SearchCity
              control={control}
              register={register}
              isInvalid={!!errors.city}
              changeCityValue={setValue}
              clickedCity={clickedCity}
              setClickedCity={setClickedCity}
              wrappedClassName="form__city"
            />
            {departments.length ? (
              <SelectDepartment
                options={departments}
                changeDepartmentValue={setValue}
                name="department"
                control={control}
                wrappedClassName="form__department"
              />
            ) : null}
          </div>
        </div>
        <div className="form__btn-wrapper">
          <Button
            text="Надіслати"
            className="form__btn"
            typeName="submit"
            disabled={
              !isValid ||
              (departments.length > 0 && !department) ||
              !clickedCity.cityName
            }
          />
        </div>
      </form>
      <Modal
        isOpened={completeModalOpened}
        onClose={closeHandler}
        wrappedClass="complete-form"
      >
        <div className="form__modal-content">
          <p className="form__done-text">
            Форму з Вашими контактними даними було надіслано, наш менеджер з
            Вами зв&lsquo;яжеться у найближчий час &#128513;
          </p>
          <Button
            onClick={backHome}
            text="Повернутись назад"
            className="form__back-btn"
          />
        </div>
      </Modal>
    </>
  )
}

export default Form
