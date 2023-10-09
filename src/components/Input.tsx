import { forwardRef, useState } from 'react'
import classNames from 'classnames'

interface IProps {
  className?: string
  name: string
  text: string
  inputValue: string
  onChangeInput: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const Input = forwardRef<HTMLInputElement, IProps>(
  ({ className, name, text, inputValue, onChangeInput }, ref) => {
    const [isFocused, setIsFocused] = useState<boolean>(false)

    return (
      <div
        className={classNames(
          'input',
          (isFocused || inputValue) && 'input--active',
          className
        )}
      >
        <label htmlFor={name} className="input__label">
          {text}
        </label>
        <input
          id={name}
          ref={ref}
          // data-invalid={isInvalid}
          // data-filled={!isInvalid && !!selectedValue}
          name={name}
          value={inputValue}
          onChange={event => onChangeInput(event)}
          onFocus={() => setIsFocused(!isFocused)}
        />
      </div>
    )
  }
)

Input.displayName = 'Input'
export default Input

Input.defaultProps = {
  className: '',
}
