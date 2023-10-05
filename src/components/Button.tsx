import { ReactNode } from 'react'

interface IProps {
  icon?: ReactNode
  text: string
  disabled?: boolean
  onClick?: () => void
}

const Button = ({ icon, text, disabled, onClick }: IProps) => {
  return (
    <button
      className="button"
      disabled={disabled}
      type="button"
      onClick={onClick}
    >
      {icon}
      {text}
    </button>
  )
}

export default Button

Button.defaultProps = {
  icon: null,
  disabled: null,
  onClick: null,
}
