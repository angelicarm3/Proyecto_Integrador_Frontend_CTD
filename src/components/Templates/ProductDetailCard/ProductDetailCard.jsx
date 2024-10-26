/* eslint-disable react/prop-types */
import './productDetailCard.css'
import { pageData } from '../../../data/page'
import ImagesGrid from '../../Organisms/ImagesGrid/ImagesGrid'
import ProductFeatures from '../../Molecules/ProductFeatures/ProductFeatures'
import RentNowBtn from '../../Atoms/RentNowBtn/RentNowBtn'

const ProductDetailCard = ({ product }) => {
  return (
    <div className='product-detail-card-container'>
      <ImagesGrid images={product.imagenes} />
      <div className='product-detail-info-container'>
        <p className='product-detail-name'>{product.marca} {product.modelo}</p>
        <p className='product-detail-daily-price'>
          ${product.precioDia}
          <span className='product-detail-day-text'>{pageData.productCard.dia}</span>
        </p>
        <ProductFeatures product={product} />
        <RentNowBtn />
      </div>
    </div>

  )
}

export default ProductDetailCard
