import { Link } from 'react-router-dom'
import IconEmptyCart from './icons/IconEmptyCart'
import Button from './Button'

const CartEmpty: React.FC = () => {
  return (
    <div className="empty-cart">
      <div className="container empty-cart__wrapper">
        <h2 className="empty-cart__title">Кошик порожній 😕</h2>
        <p className="empty-cart__description">
          Найімовірніше, Ви не замовляли ще піцу.
          <br /> Щоб замовити піцу, перейдіть на головну сторінку.
        </p>
        <IconEmptyCart />
        <Link to="/" className="cart__back-btn">
          <Button text="Повернутись назад" />
        </Link>
      </div>
    </div>
  )
}

export default CartEmpty
