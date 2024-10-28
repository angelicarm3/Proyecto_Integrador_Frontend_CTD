/* eslint-disable react/prop-types */
import ReactPaginate from 'react-paginate'
import { useSelector } from 'react-redux'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'
import { IconContext } from 'react-icons'

import './paginator.css'

const Paginator = ({ onClick }) => {
  const pageCount = useSelector((state) => state.paginator.pageCount)

  return (
    <ReactPaginate
      containerClassName='pagination'
      activeClassName='active'
      pageClassName='page-item'
      onPageChange={(event) => onClick(event.selected)}
      breakLabel='...'
      pageCount={Math.ceil(pageCount)}
      previousLabel={
        <IconContext.Provider value={{ color: '#FFFFFF', size: '20px' }}>
          <FaAngleLeft className='nav-arrow' />
        </IconContext.Provider>
        }
      nextLabel={
        <IconContext.Provider value={{ color: '#FFFFFF', size: '20px' }}>
          <FaAngleRight className='nav-arrow' />
        </IconContext.Provider>
        }
    />
  )
}

export default Paginator
