interface IProps {
  cityName: string
  cityRef: string
  province: string
  handleClick: (text: string, ref: string) => void
}

const City = ({ cityName, cityRef, province, handleClick }: IProps) => {
  return (
    <li className="city">
      <button
        type="button"
        className="city__btn"
        onClick={e => handleClick((e.target as HTMLElement).innerText, cityRef)}
      >
        м.{cityName} - {province} обл.
      </button>
    </li>
  )
}

export default City
