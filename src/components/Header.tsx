import { Link, useLocation } from 'react-router-dom'
import { useCallback, useEffect, useRef, useState } from 'react'
import IconCart from './icons/IconCart'
import SearchPizza from './SearchPizza'
import { useAppSelector } from '../redux/hooks'
import { ICartItem } from '../types/cart'

const Header = () => {
  const { items, totalPrice } = useAppSelector(state => state.cart)
  const totalCount = items.reduce(
    (sum: number, item: ICartItem) => sum + item.count,
    0
  )
  const isMounted = useRef(false)
  const { pathname } = useLocation()
  const [isHidden, setIsHidden] = useState(false)
  const lastScrollY = useRef(0)
  const headerRef = useRef<HTMLDivElement | null>(null)

  const updateHeaderHeight = useCallback(() => {
    if (headerRef.current) {
      const height = headerRef.current.offsetHeight
      document.documentElement.style.setProperty(
        '--header-height',
        `${height}px`
      )
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setIsHidden(true)
      } else {
        setIsHidden(false)
      }
      lastScrollY.current = currentScrollY
    }

    const handleClick = () => {
      setIsHidden(false)
    }

    window.addEventListener('scroll', handleScroll)
    document.addEventListener('mousedown', handleClick)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      document.removeEventListener('mousedown', handleClick)
    }
  }, [])

  useEffect(() => {
    if (isMounted.current) {
      const json = JSON.stringify(items)
      localStorage.setItem('cart', json)
    }
    isMounted.current = true
  }, [items, totalPrice])

  useEffect(() => {
    const observer = new ResizeObserver(() => updateHeaderHeight())
    if (headerRef.current) {
      observer.observe(headerRef.current)
    }

    updateHeaderHeight()

    return () => {
      observer.disconnect()
    }
  }, [updateHeaderHeight])

  return (
    <header
      ref={headerRef}
      className={`container header ${isHidden ? 'header--hidden' : ''}`}
    >
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
