/* eslint-disable react/prop-types */
import { useSelector } from 'react-redux'

import './productDetailCard.css'
import { pageData } from '../../../data/page'
import BackBtn from '../../Atoms/BackBtn/BackBtn'
import ImagesGrid from '../../Organisms/ImagesGrid/ImagesGrid'
import ProductFeatures from '../../Molecules/ProductFeatures/ProductFeatures'
import RentNowBtn from '../../Atoms/RentNowBtn/RentNowBtn'

const ProductDetailCard = () => {
  const selectedProduct = useSelector((state) => state.product.selectedProduct)
console.log(selectedProduct)
  return (
    <div className='product-detail-card-container'>
      <BackBtn />
      <p className='product-detail-name'>{selectedProduct.marca} {selectedProduct.modelo}</p>
      <div className='product-detail-info-container'>
        <ImagesGrid product={selectedProduct} />
        <div className='product-detail-text-container'>
          <p className='product-detail-daily-price'>
            ${selectedProduct.precioDia}
            <span className='product-detail-day-text'>{pageData.productCard.dia}</span>
          </p>
          <p className='text-sm'>{selectedProduct.descripcion}</p>
          <ProductFeatures product={selectedProduct} type='detail' />
          <RentNowBtn />
        </div>
      </div>
    </div>
  )
}

export default ProductDetailCard
