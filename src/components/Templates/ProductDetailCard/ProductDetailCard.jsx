/* eslint-disable react/prop-types */
import './productDetailCard.css'
import { pageData } from '../../../data/page'
import BackBtn from '../../Atoms/BackBtn/BackBtn'
import ImagesGrid from '../../Organisms/ImagesGrid/ImagesGrid'
import ProductFeatures from '../../Molecules/ProductFeatures/ProductFeatures'
import RentNowBtn from '../../Atoms/RentNowBtn/RentNowBtn'

const ProductDetailCard = ({ product }) => {
  return (
    <div className='product-detail-card-container'>
      <BackBtn />
      <p className='product-detail-name'>{product.marca} {product.modelo}</p>
      <div className='product-detail-info-container'>
        <ImagesGrid product={product} />
        <div className='product-detail-text-container'>
          <p className='product-detail-daily-price'>
            ${product.precioDia}
            <span className='product-detail-day-text'>{pageData.productCard.dia}</span>
          </p>
          <p className='text-sm'>{product.descripcion}</p>
          <ProductFeatures product={product} type='detail' />
          <RentNowBtn />
        </div>
      </div>
    </div>
  )
}

export default ProductDetailCard
