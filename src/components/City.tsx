interface IProps {
  cityName: string
  cityRef: string
  province: string
  handleClick: (text: string, ref: string) => void
}

const City = ({ cityName, cityRef, province, handleClick }: IProps) => {
  const onClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const target = e.target as HTMLElement
    handleClick(target.innerText, cityRef)
  }

  return (
    <li className="city">
      <button type="button" className="city__btn" onClick={e => onClick(e)}>
        м.{cityName} - {province} обл.
      </button>
    </li>
  )
}

export default City
