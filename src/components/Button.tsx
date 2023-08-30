import { ReactNode } from 'react'

interface IProps {
  icon?: ReactNode
  text: string
  disabled?: boolean
}

const Button = ({ icon, text, disabled }: IProps) => {
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
