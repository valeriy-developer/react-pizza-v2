import { Link, useLocation } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import IconCart from './icons/IconCart'
import SearchPizza from './SearchPizza'
import { useAppSelector } from '../redux/hooks'
import { ICartItem } from '../types/cart'

const Header = () => {
  const { items, totalPrice } = useAppSelector(state => state.cart)
  const totalCount = items.reduce((sum: number, item: ICartItem) => {
    return sum + item.count
  }, 0)

  const isMounted = useRef(false)

  const { pathname } = useLocation()

  useEffect(() => {
    if (isMounted.current) {
      const json = JSON.stringify(items)
      localStorage.setItem('cart', json)
    }

    isMounted.current = true
  }, [items, totalPrice])

  return (
    <header className="container header">
      <div className="header__wrapper">
        {pathname === '/' ? (
          <Link className="header__left-link" reloadDocument to="/">
            <img className="header__logo" src="images/logo.jpg" alt="Logo" />
            <div className="header__text">
              <h1 className="header__title">REACT PIZZA</h1>
              <p className="header__subtitle">Найсмачніша піца у всесвіті</p>
            </div>
          </Link>
        ) : (
          <Link className="header__left-link" to="/">
            <img className="header__logo" src="images/logo.jpg" alt="Logo" />
            <div className="header__text">
              <h1 className="header__title">REACT PIZZA</h1>
              <p className="header__subtitle">Найсмачніша піца у всесвіті</p>
            </div>
          </Link>
        )}
        {pathname !== '/cart' && <SearchPizza wrappedClass="header__search" />}
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
      {pathname !== '/cart' && (
        <SearchPizza wrappedClass="header__search header__search--mob" />
      )}
    </header>
  )
}

export default Header
