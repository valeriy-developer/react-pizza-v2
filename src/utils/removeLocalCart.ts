import getLocalCart from './getLocalCart'

const removeLocalCart = () => {
  const { items } = getLocalCart()
  localStorage.removeItem('cart')

  return items
}

export default removeLocalCart
