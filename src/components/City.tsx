interface IProps {
  cityName: string
  province: string
  handleClick: (text: string) => void
}

const City = ({ cityName, province, handleClick }: IProps) => {
  return (
    <li className="city">
      <button
        type="button"
        className="city__btn"
        onClick={e => handleClick((e.target as HTMLElement).innerText)}
      >
        м.{cityName} - {province} обл.
      </button>
    </li>
  )
}

export default City
