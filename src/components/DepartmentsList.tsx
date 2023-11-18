import { useState } from 'react'
import classNames from 'classnames'
import { Control, UseFormRegister } from 'react-hook-form'
import { IDepartmentNovaPoshta, IForm } from '../types'
import Department from './Department'
import IconArrowDown from './icons/IconArrowDown'

interface IProps {
  departments: IDepartmentNovaPoshta[]
  control: Control<IForm>
  register: UseFormRegister<IForm>
}

const DepartmentsList = ({ departments, control, register }: IProps) => {
  const [isModalOpened, setIsModalOpened] = useState<boolean>(false)
  const [departmentValue, setDepartmentValue] =
    useState<string>('Оберіть відділення')

  return (
    <div className="departments-list">
      <button
        type="button"
        className={classNames(
          'departments-list__current',
          isModalOpened && 'departments-list__current--active'
        )}
        onClick={() => setIsModalOpened(!isModalOpened)}
      >
        {departmentValue}
        <IconArrowDown />
      </button>
      <div
        className={`departments-list__modal ${
          isModalOpened && 'departments-list__modal--active'
        }`}
      >
        <ul className="departments-list__list">
          {departments.map(item => (
            <Department
              key={item.departmentRef}
              departmentName={item.department}
              control={control}
              name={item.department}
              departmentClick={() => {
                setDepartmentValue(item.department)
                setIsModalOpened(false)
              }}
            />
          ))}
        </ul>
        <input
          type="hidden"
          {...register(`department`, {
            required: true,
          })}
        />
      </div>
    </div>
  )
}

export default DepartmentsList
