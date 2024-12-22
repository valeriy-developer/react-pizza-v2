import { useState } from 'react'
import { toast } from 'react-toastify'
import IconPlus from './icons/IconPlus'
import { addItem } from '../redux/slices/cartSlice'
import { useAppDispatch } from '../redux/hooks'
import { IPizza } from '../types/pizza'

const doughs: string[] = ['Тонке', 'Традиційне']

const Item: React.FC<IPizza> = ({
  id,
  title,
  price,
  imgUrl,
  types,
  size,
}: IPizza) => {
  const dispatch = useAppDispatch()

  const [activeDough, setActiveDough] = useState<number>(0)
  const [activeSize, setActiveSize] = useState<number>(0)

  const notify = () => {
    toast(
      `${
        title.includes('піца') || title.includes('Піца')
          ? title
          : `Піца ${title.toLowerCase()}`
      } додана до кошика`
    )
  }

  const onClickAdd = (): void => {
    const item = {
      id,
      title,
      price,
      imgUrl,
      typeItem: doughs[activeDough],
      sizeItem: size[activeSize],
      count: 0,
    }

    dispatch(addItem(item))
    notify()
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
                <li key={Math.random()} className="item__dough">
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
                <li key={Math.random()} className="item__size">
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
          </button>
        </div>
      </div>
    </div>
  )
}

export default Item
