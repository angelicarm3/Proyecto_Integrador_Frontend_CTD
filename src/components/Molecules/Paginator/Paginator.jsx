/* eslint-disable react/prop-types */
import ReactPaginate from 'react-paginate'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'
import { IconContext } from 'react-icons'

import './paginator.css'
import { productsData } from '../../../data/products'

const Paginator = ({ onClick, n }) => {
  return (
    <ReactPaginate
      containerClassName='pagination'
      activeClassName='active'
      pageClassName='page-item'
      onPageChange={(event) => onClick(event.selected)}
      breakLabel='...'
      pageCount={Math.ceil(productsData.products.length / n)}
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
