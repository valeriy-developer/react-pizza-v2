import { Link, useLocation } from 'react-router-dom'
import IconCart from './icons/IconCart'
import SearchInput from './SearchInput'
import { useAppSelector } from '../redux/hooks'
import { ICartItem } from '../types/cart'

const Header = () => {
  const { items, totalPrice } = useAppSelector(state => state.cart)
  const totalCount = items.reduce((sum: number, item: ICartItem) => {
    return sum + item.count
  }, 0)

  const { pathname } = useLocation()

  return (
    <header className="container header">
      <div className="header__wrapper">
        <Link className="header__left-link" to="/">
          <img className="header__logo" src="images/logo.jpg" alt="Logo" />
          <div className="header__text">
            <h1 className="header__title">REACT PIZZA</h1>
            <p className="header__subtitle">Найсмачніша піца у всесвіті</p>
          </div>
        </Link>
        <SearchInput />
        {pathname !== '/cart' && (
          <Link className="header__right-link" to="/cart">
            <p className="header__price">{totalPrice} грн.</p>
            <div className="heder__line" />
            <div className="header__cart-wrapper">
              <IconCart />
              <p className="header__count-item">{totalCount}</p>
            </div>
          </Link>
        )}
      </div>
    </header>
  )
}

export default Header