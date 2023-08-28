import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import IconPlus from './icons/IconPlus'
import { addItem } from '../redux/slices/cartSlice'

interface Props {
  id: number
  title: string
  price: number
  imgUrl: string
  types: number[]
  size: number[]
}

const doughs: string[] = ['Тонке', 'Традиційне']

const Item = ({ id, title, price, imgUrl, types, size }: Props) => {
  const dispatch = useDispatch()

  const [activeDough, setActiveDough] = useState(0)
  const [activeSize, setActiveSize] = useState(0)
  const cartItem = useSelector((state: any) =>
    state.cart.items.find((obj: any) => obj.id === id)
  )
  const addedCount = cartItem ? cartItem.count : 0

  const onClickAdd = () => {
    const item = {
      id,
      title,
      price,
      imgUrl,
      type: doughs[activeDough],
      size: size[activeSize],
    }

    dispatch(addItem(item))
  }

  return (
    <div className="item">
      <img src={imgUrl} alt="Pizza" className="ratio-img item__img" />
      <div className="item__content">
        <h3 className="item__title">{title}</h3>
        <div className="item__variations">
          <ul className="item__dough-menu">
            {types.map((typeNum, idx) => {
              return (
                <li key={idx} className="item__dough">
                  <button
                    className={
                      activeDough === idx
                        ? 'item__dough-btn  item__dough-btn--active'
                        : 'item__dough-btn'
                    }
                    type="button"
                    onClick={() => setActiveDough(typeNum)}
                  >
                    {doughs[typeNum]}
                  </button>
                </li>
              )
            })}
          </ul>
          <ul className="item__size-menu">
            {size.map((sizeNum, idx) => {
              return (
                <li key={idx} className="item__size">
                  <button
                    className={
                      activeSize === idx
                        ? 'item__size-btn item__size-btn--active'
                        : 'item__size-btn'
                    }
                    onClick={() => setActiveSize(idx)}
                    type="button"
                  >
                    {sizeNum} см.
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
        <div className="item__purchase-wrapper">
          <p className="item__price">від {price} грн.</p>
          <button onClick={onClickAdd} className="item__btn" type="button">
            <IconPlus />
            Додати
            {addedCount > 0 && (
              <span className="item__amount">{addedCount}</span>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Item
