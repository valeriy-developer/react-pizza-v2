import classNames from 'classnames'
import { useState, FC, useEffect } from 'react'
import { Control, Controller } from 'react-hook-form'
import { IDepartmentNovaPoshta, IForm } from '../types'

type IProps = {
  options: IDepartmentNovaPoshta[]
  name: 'city' | 'phone' | 'email' | 'department'
  control: Control<IForm>
  changeDepartmentValue: (
    name: 'city' | 'phone' | 'email' | 'department',
    value: string
  ) => void
  wrappedClassName?: string
}

const SelectDepartment: FC<IProps> = ({
  options,
  name,
  control,
  changeDepartmentValue,
  wrappedClassName,
}) => {
  const [isOpen, setOpen] = useState(false)

  useEffect(() => {
    changeDepartmentValue('department', '')
  }, [changeDepartmentValue, options])

  return (
    <Controller
      name={name}
      control={control}
      rules={{
        required: true,
      }}
      defaultValue={options[0]?.department}
      render={({ field }) => (
        <div className={classNames('select-department', wrappedClassName)}>
          <div
            className="select-department__value"
            onClick={() => setOpen(!isOpen)}
            tabIndex={0}
            role="button"
            onKeyDown={() => {}}
          >
            {!field.value ? (
              <p className="select-department__text">Оберіть відділення</p>
            ) : (
              field.value
            )}
          </div>
          <div
            className={classNames(
              'select-department__modal',
              isOpen && 'select-department__modal--active'
            )}
          >
            {options.map(option => (
              <div
                key={option.departmentRef}
                className={classNames(
                  'select-department__option',
                  field.value === option.department &&
                    'select-department__option--selected'
                )}
                onClick={() => {
                  field.onChange(option.department)
                  setOpen(false)
                }}
                tabIndex={0}
                role="button"
                onKeyDown={() => {}}
              >
                {option.department}
              </div>
            ))}
          </div>
        </div>
      )}
    />
  )
}

export default SelectDepartment

SelectDepartment.defaultProps = {
  wrappedClassName: '',
}
