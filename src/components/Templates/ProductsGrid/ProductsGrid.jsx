import { useEffect, useRef, useState } from 'react'

import './productsGrid.css'
import { productsData } from '../../../data/products'
import ProductCard from '../../Organisms/ProductCard/ProductCard'
import Paginator from '../../Molecules/Paginator/Paginator'

const ProductsGrid = () => {
  const gridRef = useRef()
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

  const onClick = (page) => {
    setPage(page)
    gridRef.current?.scrollIntoView({
      behavior: 'smooth'
    })
  }

  return (
    <section className='main-section products-grid-container'>
      <div className='products-grid' ref={gridRef}>
        {
          filterData &&
          filterData.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))
        }
      </div>
      <Paginator onClick={onClick} n={n} />
    </section>
  )
}

export default ProductsGrid
