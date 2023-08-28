import ReactPaginate from 'react-paginate'

interface Props {
  onChangePage: (selectedPage: number) => void
  totalPages: number
  limit: number
}

const Pagination = ({ onChangePage, totalPages, limit }: Props) => {
  return (
    <ReactPaginate
      className="pagination"
      breakLabel="..."
      nextLabel=">"
      onPageChange={e => onChangePage(e.selected + 1)}
      pageRangeDisplayed={limit}
      pageCount={totalPages}
      previousLabel="<"
      renderOnZeroPageCount={null}
    />
  )
}

export default Pagination
