import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'

import isoGold from '../../../assets/brand/isoGold.svg'
import { changePage, filterData } from '../../../context/slices/paginatorSlice'
import Paginator from '../../Molecules/Paginator/Paginator'
import ProductCard from '../../Organisms/ProductCard/ProductCard'
import RequireLoginPopup from '../RequireLoginPopup/RequireLoginPopup'
import './productsGrid.css'

const ProductsGrid = () => {
  const gridRef = useRef()
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const { items } = useSelector((state) => state.paginator)
  const { totalProducts, resultsQuantity, filteredProducts } = useSelector((state) => state.product)
  const [showRequireLoginPopup, setShowRequireLoginPopup] = useState(false)

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
               <ProductCard key={index} product={product} setShowRequireLoginPopup={setShowRequireLoginPopup} />
             ))
        }
        {
          items?.length === 0 &&
            <div className='h-[300px] flex flex-col justify-center items-center text-gray3 text-lg'>
              <p>{t('weAreSorry')}</p>
              <p>{t('noCarsMatchYourSearch')}</p>
              <img src={isoGold} alt='Logo de la marca' className='h-[150px] mt-6' />
            </div>
        }
      </div>
      <Paginator totalItems={totalProducts} resultsQuantity={resultsQuantity} onClick={onClick} />

      {
        showRequireLoginPopup &&
          <RequireLoginPopup onClose={() => setShowRequireLoginPopup(false)} />
      }
    </section>
  )
}

export default ProductsGrid
