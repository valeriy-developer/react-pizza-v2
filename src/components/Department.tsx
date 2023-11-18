import { Control, useController } from 'react-hook-form'
import { IForm } from '../types'

interface IProps {
  departmentName: string
  control: Control<IForm>
  name: string
  departmentClick: () => void
}

const Department = ({
  departmentName,
  control,
  name,
  departmentClick,
}: IProps) => {
  const data = useController({ control, name: 'department' })

  const clickHandler = () => {
    data.field.value = departmentName
    departmentClick()
  }

  return (
    <li className="department">
      <input
        type="radio"
        id={name}
        className="department__input"
        onClick={clickHandler}
        {...data.field}
      />
      <label htmlFor={name} className="department__text">
        {departmentName}
      </label>
    </li>
  )
}

Department.displayName = 'Department'
export default Department
