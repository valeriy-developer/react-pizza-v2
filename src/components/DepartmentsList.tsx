import { useState } from 'react'
import classNames from 'classnames'
import { IDepartmentNovaPoshta } from '../types'
import Department from './Department'
import IconArrowDown from './icons/IconArrowDown'

interface IProps {
  departments: IDepartmentNovaPoshta[]
}

const DepartmentsList = ({ departments }: IProps) => {
  const [isModalOpened, setIsModalOpened] = useState<boolean>(false)

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
        Оберіть відділення
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
              id={item.departmentRef}
            />
          ))}
        </ul>
      </div>
    </div>
  )
}

export default DepartmentsList
