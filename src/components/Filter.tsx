interface IProps {
  value: number
  onClickCategory: (id: number) => void
}

const Filter = ({ value, onClickCategory }: IProps) => {
  const categories: Array<string> = [
    'Усі',
    "М'ясні",
    'Вегетаріанські',
    'Гриль',
    'Гострі',
    'Закриті',
  ]

  return (
    <ul className="filter">
      {categories.map((el: string, idx: number) => {
        return (
          <li key={el} className="filter__li">
            <button
              className={
                value === idx
                  ? 'filter__btn filter__btn--active'
                  : 'filter__btn'
              }
              onClick={(): void => onClickCategory(idx)}
              type="button"
            >
              <p className="filter__text">{el}</p>
            </button>
          </li>
        )
      })}
    </ul>
  )
}

export default Filter
