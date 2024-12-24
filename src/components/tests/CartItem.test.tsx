import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import CartItem from '../CartItem'

test('CartItem renders correctly', () => {
  render(
    <CartItem
      id="1"
      imgUrl="/images/items/sirna.png"
      title='Pizza "Sirna"'
      price={200}
      typeItem="тонке"
      sizeItem={20}
      count={1}
    />
  )

  expect(screen.getByText('Pizza "Sirna"')).toBeInTheDocument()
})
