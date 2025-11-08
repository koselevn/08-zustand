import ReactPaginate from 'react-paginate'
import css from './Pagination.module.css'

interface PaginationProps {
    totalPages: number
    currentPage: number
    onPageChange: (page: number) => void
}

export default function Pagination({ totalPages, currentPage, onPageChange }: PaginationProps) {
  const handlePageClick = (event: { selected: number }) => {
    onPageChange(event.selected + 1)
  }

  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel="Next >"
      onPageChange={handlePageClick}
      pageRangeDisplayed={3}
      marginPagesDisplayed={1}
      pageCount={totalPages}
      previousLabel="< Prev"
      renderOnZeroPageCount={null}
      forcePage={currentPage - 1} // синхронізація
      containerClassName={css.pagination}
      activeClassName={css.active}
    />
  )
}