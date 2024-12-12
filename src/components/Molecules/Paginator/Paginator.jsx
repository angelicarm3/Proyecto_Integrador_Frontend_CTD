import { useTranslation } from 'react-i18next'
import { IconContext } from 'react-icons'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'
import ReactPaginate from 'react-paginate'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'

import './paginator.css'

const Paginator = ({ totalItems, resultsQuantity, onClick }) => {
  const location = useLocation()
  const { t } = useTranslation()
  const { pageCount, startIndex, endIndex } = useSelector((state) => state.paginator)

  return (
    <div className={`paginator-container ${location?.pathname !== '/' && 'w-11/12'}`}>
      <ReactPaginate
        containerClassName={`pagination ${location?.pathname === '/' ? 'text-white' : 'text-black1'}`}
        activeClassName='active'
        pageClassName='page-item'
        onPageChange={(event) => onClick(event.selected)}
        breakLabel='...'
        pageCount={Math.ceil(pageCount)}
        previousLabel={
          <IconContext.Provider value={{ color: `${location?.pathname === '/' ? '#FFFFFF' : '#080808'}`, size: '20px' }}>
            <FaAngleLeft className='nav-arrow' />
          </IconContext.Provider>
        }
        nextLabel={
          <IconContext.Provider value={{ color: `${location?.pathname === '/' ? '#FFFFFF' : '#080808'}`, size: '20px' }}>
            <FaAngleRight className='nav-arrow' />
          </IconContext.Provider>
        }
      />
      {
        location?.pathname === '/'
          ? <p className='results-container'>
            {resultsQuantity}
            {resultsQuantity === 1
              ? `${t('coincidenceOf')}`
              : `${t('coincidencesOf')} ${totalItems}`}
          </p>
          : <p className='admin-products-p'>
            {`${t('results')} ${startIndex + 1}-${endIndex} ${t('of')} ${totalItems}`}
          </p>
      }
    </div>
  )
}

export default Paginator
