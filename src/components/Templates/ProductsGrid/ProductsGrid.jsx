import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import './productsGrid.css'
import { filterData, changePage } from '../../../context/slices/paginatorSlice'
import ProductCard from '../../Organisms/ProductCard/ProductCard'
import Paginator from '../../Molecules/Paginator/Paginator'

const ProductsGrid = () => {
  const gridRef = useRef()
  const dispatch = useDispatch()
  const { pageLabels } = useSelector((state) => state.paginator)
  const filteredProducts = useSelector((state) => state.product.filteredProducts)

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
          pageLabels &&
          pageLabels.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))
        }
      </div>
      <Paginator onClick={onClick} />
    </section>
  )
}

export default ProductsGrid
