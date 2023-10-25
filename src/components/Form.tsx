import { SubmitHandler, useForm } from 'react-hook-form'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from './Button'
import Input from './Input'
import { IForm } from '../types'
import { email, phone } from '../constants/regex'
import Modal from './Modal'
import { FormContext } from '../context/FormContextProvider'
import removeLocalCart from '../utils/removeLocalCart'
import { useAppDispatch } from '../redux/hooks'
import { clearItems } from '../redux/slices/cartSlice'
import SearchCity from './SearchCity'

const Form = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid, isDirty },
    setValue,
  } = useForm<IForm>({
    mode: 'all',
    defaultValues: {
      city: '',
      email: '',
      phone: '',
    },
  })

  const dispatch = useAppDispatch()

  const navigate = useNavigate()

  const { setFormOpened, setCompleteModalOpened, completeModalOpened } =
    useContext(FormContext)

  const closeHandler = () => {
    setFormOpened(false)
    setCompleteModalOpened(false)
  }

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

  const backHome = () => {
    navigate('/')
    setCompleteModalOpened(false)
    document.body.classList.remove('scroll-fixed')
  }

  return (
    <>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <legend className="form__title">Контакти для замовлення</legend>
        <div className="form__content-wrapper">
          <Input
            {...register('email', {
              required: true,
              pattern: email,
            })}
            text="Введіть електронну адресу..."
            control={control}
            isInvalid={!!errors.email}
          />
          <Input
            {...register('phone', { required: true, pattern: phone })}
            text="Введіть номер моб. телефону..."
            control={control}
            isInvalid={!!errors.phone}
          />
          <SearchCity
            control={control}
            register={register}
            isInvalid={!!errors.city}
            changeCityValue={setValue}
          />
        </div>
        <Button
          text="Надіслати"
          className="form__btn"
          typeName="submit"
          disabled={!isDirty || !isValid}
        />
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
