import { useEffect, useState } from 'react'

import ReactPaginate from 'react-paginate'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'
import { IconContext } from 'react-icons'

import './productsGrid.css'
import { productsData } from '../../../data/products'
import ProductCard from '../../Organisms/ProductCard/ProductCard'

const ProductsGrid = () => {
  const [page, setPage] = useState(0)
  const [filterData, setFilterData] = useState()
  const n = 9

  useEffect(() => {
    setFilterData(
      productsData.products.filter((item, index) => {
        return (index >= page * n) & (index < (page + 1) * n)
      })
    )
  }, [page])

  return (
    <section className='main-section products-grid-container'>
      <div className='products-grid'>
        {
          filterData &&
          filterData.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))
        }
      </div>

      <ReactPaginate
        containerClassName='pagination'
        activeClassName='active'
        pageClassName='page-item'
        onPageChange={(event) => setPage(event.selected)}
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
    </section>
  )
}

export default ProductsGrid
