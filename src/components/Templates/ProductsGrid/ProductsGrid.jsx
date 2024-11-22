import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import './productsGrid.css'
import { filterData, changePage } from '../../../context/slices/paginatorSlice'
import ProductCard from '../../Organisms/ProductCard/ProductCard'
import Paginator from '../../Molecules/Paginator/Paginator'

const ProductsGrid = () => {
  const gridRef = useRef()
  const dispatch = useDispatch()
  const { items } = useSelector((state) => state.paginator)
  const { totalProducts, resultsQuantity, filteredProducts } = useSelector((state) => state.product)

  useEffect(() => {
    dispatch(filterData(filteredProducts))
  }, [dispatch, filteredProducts])

  const onClick = (page) => {
    dispatch(changePage(page))
    dispatch(filterData(filteredProducts))
    gridRef.current?.scrollIntoView({
      behavior: 'smooth'
    })
  }

  return (
    <section className='main-section products-grid-container'>
      <div className='products-grid' ref={gridRef}>
        {
          items &&
          items.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))
        }
      </div>
      <Paginator totalItems={totalProducts} resultsQuantity={resultsQuantity} onClick={onClick} />
    </section>
  )
}

export default ProductsGrid
