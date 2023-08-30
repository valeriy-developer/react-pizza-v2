import { Link } from 'react-router-dom'
import IconBasket from '../components/icons/IconBasket'
import IconArrowLeft from '../components/icons/IconArrowLeft'
import IconBlackCart from '../components/icons/IconBlackCart'
import Button from '../components/Button'
import CartItem from '../components/CartItem'
import { clearItems } from '../redux/slices/cartSlice'
import CartEmpty from '../components/CartEmpty'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { ICartItem } from '../types/cart'

const Cart = () => {
  const dispatch = useAppDispatch()
  const { items, totalPrice } = useAppSelector(state => state.cart)

  const totalCount = items.reduce((sum: number, item: ICartItem) => {
    return sum + item.count
  }, 0)

  const onClickClear = (): void => {
    dispatch(clearItems())
  }

  if (!totalPrice) {
    return <CartEmpty />
  }

  return (
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
          <Link to="/" className="cart__back-btn">
            <Button icon={<IconArrowLeft />} text="Повернутись назад" />
          </Link>
          <Button text="Оплатити зараз" />
        </div>
      </div>
    </div>
  )
}

export default Cart
