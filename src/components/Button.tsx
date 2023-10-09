import { ReactNode } from 'react'
import classNames from 'classnames'

interface IProps {
  icon?: ReactNode
  text: string
  disabled?: boolean
  onClick?: () => void
  className?: string
}

const Button = ({ icon, text, disabled, onClick, className }: IProps) => {
  return (
    <button
      className={classNames('button', className)}
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
  className: '',
}
