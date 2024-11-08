import ReactPaginate from 'react-paginate'
import { useSelector } from 'react-redux'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'
import { IconContext } from 'react-icons'

import './paginator.css'
import { pageLabels } from '../../../data/pageLabels'

const Paginator = ({ onClick }) => {
  const pageCount = useSelector((state) => state.paginator.pageCount)
  const { totalProducts, resultsQuantity } = useSelector((state) => state.product)

  console.log(totalProducts)
  console.log(resultsQuantity)
  return (
    <div className='paginator-container'>
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
      <p className='results-container'>{resultsQuantity}{resultsQuantity === 1 ? pageLabels.categories.resultCountOne : pageLabels.categories.resultCount}{totalProducts}</p>
    </div>
  )
}

export default Paginator
