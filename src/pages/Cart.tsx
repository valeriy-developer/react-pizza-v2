import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import IconBasket from '../components/icons/IconBasket'
import IconArrowLeft from '../components/icons/IconArrowLeft'
import IconBlackCart from '../components/icons/IconBlackCart'
import Button from '../components/Button'
import CartItem from '../components/CartItem'
import { clearItems } from '../redux/slices/cartSlice'
import CartEmpty from '../components/CartEmpty'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { ICartItem } from '../types/cart'
import Modal from '../components/Modal'
import Form from '../components/Form'
import { FormContext } from '../context/FormContextProvider'

const Cart = () => {
  const dispatch = useAppDispatch()
  const { items, totalPrice } = useAppSelector(state => state.cart)
  const { formOpened, setFormOpened } = useContext(FormContext)
  const navigate = useNavigate()

  const totalCount = items.reduce((sum: number, item: ICartItem) => {
    return sum + item.count
  }, 0)

  const onClickClear = (): void => {
    dispatch(clearItems())
  }

  // if (!totalPrice) {
  //   return <CartEmpty />
  // }

  const closeHandler = () => {
    setFormOpened(false)
  }

  const clickHandler = () => {
    setFormOpened(true)
  }

  const backHome = () => {
    navigate('/')
  }

  const cartContent = (
    <div className="cart">
      <div className="cart__top-block">
        <div className="cart__title-wrapper">
          <IconBlackCart />
          <h2 className="cart__title">Кошик</h2>
        </div>
        <button
          onClick={onClickClear}
          className="cart__clear-btn"
          type="button"
        >
          <IconBasket />
          Очистити кошик
        </button>
      </div>
      <ul className="cart__item-list">
        {items.map((el: ICartItem) => {
          return <CartItem key={Math.random()} {...el} />
        })}
      </ul>
      <div className="cart__bottom-block">
        <div className="cart__info-wrapper">
          <p className="cart__quantity">
            Усього піцц:
            <span className="cart__quantity-bold"> {totalCount} шт</span>
          </p>
          <p className="cart__summ">
            Сума замовлення:
            <span className="cart__summ-bold"> {totalPrice} грн.</span>
          </p>
        </div>
        <div className="cart__btns-wrapper">
          <Button
            icon={<IconArrowLeft />}
            text="Повернутись назад"
            className="cart__back-btn"
            onClick={backHome}
          />
          <Button onClick={clickHandler} text="Оплатити зараз" />
        </div>
      </div>
    </div>
  )

  return (
    <>
      {!totalPrice ? <CartEmpty /> : cartContent}
      <Modal onClose={closeHandler} isOpened={formOpened}>
        <Form />
      </Modal>
    </>
  )
}

export default Cart
