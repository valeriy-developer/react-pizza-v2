import { useNavigate } from 'react-router-dom'
import { FC } from 'react'
import Button from './Button'

const CartEmpty: FC = () => {
  const navigate = useNavigate()

  const backHome = () => {
    navigate('/')
  }

  return (
    <div className="empty-cart">
      <div className="container empty-cart__wrapper">
        <h2 className="empty-cart__title">Кошик порожній 😕</h2>
        <p className="empty-cart__description">
          Найімовірніше, Ви не замовляли ще піцу.
          <br /> Щоб замовити піцу, перейдіть на головну сторінку.
        </p>
        <Button
          text="Повернутись назад"
          className="empty-cart__btn"
          onClick={backHome}
        />
      </div>
    </div>
  )
}

export default CartEmpty
