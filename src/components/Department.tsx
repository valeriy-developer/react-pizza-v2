interface IProps {
  departmentName: string
  id: string
}

const Department = ({ departmentName, id }: IProps) => {
  return (
    <li className="department">
      <input
        type="radio"
        id={id}
        name="fav_language"
        value="HTML"
        className="department__input"
      />
      <label htmlFor={id} className="department__text">
        {departmentName}
      </label>
    </li>
  )
}

export default Department
