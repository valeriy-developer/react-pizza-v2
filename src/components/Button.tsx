import { ReactNode } from 'react'

interface Props {
  icon?: ReactNode
  text: string
  disabled?: boolean
}

const Button = ({ icon, text, disabled }: Props) => {
  return (
    <button className="button" disabled={disabled} type="button">
      {icon}
      {text}
    </button>
  )
}

export default Button

Button.defaultProps = {
  icon: null,
  disabled: null,
}
