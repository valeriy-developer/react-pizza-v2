import { useDispatch } from 'react-redux'
import IconAmountMinus from './icons/IconAmountMinus'
import IconAmountPlus from './icons/IconAmountPlus'
import IconRemove from './icons/IconRemove'
import { minusItem, plusItem, removeItem } from '../redux/slices/cartSlice'

interface Props {
  id: string
  imgUrl: string
  title: string
  count: number
  price: number
  type: string
  size: string
}

const CartItem = ({ id, imgUrl, title, count, price, type, size }: Props) => {
  const dispatch = useDispatch()

  const onClickPlus = () => {
    dispatch(plusItem(id))
  }

  const onClickMinus = () => (count <= 0 ? null : dispatch(minusItem(id)))

  const onClickRemove = () => {
    dispatch(removeItem(id))
  }

  return (
    <li className="grid cart__item">
      <div className="cart__item-details">
        <img className="ratio-img cart__item-img" src={imgUrl} alt="Pizza" />
        <div className="cart__text-wrapper">
          <p className="cart__item-name">{title}</p>
          <p className="cart__item-dough">
            {type} тісто,
            <span className="cart__item-size"> {size} см.</span>
          </p>
        </div>
      </div>
      <div className="cart__amount-wrapper">
        <button
          onClick={onClickMinus}
          className="cart__amount-btn"
          type="button"
        >
          <IconAmountMinus />
        </button>
        <p className="cart__amount">{count}</p>
        <button
          onClick={onClickPlus}
          className="cart__amount-btn"
          type="button"
        >
          <IconAmountPlus />
        </button>
      </div>
      <p className="cart__price">{price * count} грн.</p>
      <button
        onClick={onClickRemove}
        className="cart__remove-btn"
        type="button"
      >
        <IconRemove />
      </button>
    </li>
  )
}

export default CartItem
