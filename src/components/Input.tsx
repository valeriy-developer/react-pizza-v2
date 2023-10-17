import { forwardRef, useState } from 'react'
import classNames from 'classnames'
import { Control, useController } from 'react-hook-form'
import { IForm } from '../types'

interface IProps {
  className?: string
  name: keyof IForm
  control: Control<IForm>
  text: string
  type?: string
  isInvalid: boolean
}

const Input = forwardRef<HTMLInputElement, IProps>(
  ({ className, name, text, type, control, isInvalid, ...rest }, ref) => {
    const [isFocused, setIsFocused] = useState<boolean>(false)
    const data = useController({ control, name })

    // const emailValue = useWatch({ control, defaultValue: '', name })

    const blurHandler = () => {
      data.field.onBlur()
      setIsFocused(false)
    }

    return (
      <div
        className={classNames(
          'input',
          (data.field.value || isFocused) && 'input--active',
          className
        )}
      >
        <label htmlFor={name} className="input__label">
          {text}
        </label>
        <input
          id={name}
          type={type}
          ref={ref}
          name={name}
          onFocus={() => setIsFocused(true)}
          {...rest}
          onBlur={blurHandler}
        />
        {isInvalid && <p className="input__error">Спробуйте ще раз</p>}
      </div>
    )
  }
)

Input.displayName = 'Input'
export default Input

Input.defaultProps = {
  className: '',
  type: 'text',
}
