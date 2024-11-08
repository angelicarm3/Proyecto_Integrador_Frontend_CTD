import { useSelector } from 'react-redux'

import './productDetailCard.css'
import { pageData } from '../../../data/page'
import BackBtn from '../../Atoms/BackBtn/BackBtn'
import ImagesGrid from '../../Organisms/ImagesGrid/ImagesGrid'
import ProductFeatures from '../../Molecules/ProductFeatures/ProductFeatures'
import ProductCharacteristics from '../../Molecules/ProductCharacteristics/ProductCharacteristics'
import RentNowBtn from '../../Atoms/RentNowBtn/RentNowBtn'

const ProductDetailCard = () => {
  const selectedProduct = useSelector((state) => state.product.selectedProduct)

  return (
    <div className='main-section product-detail-card-container'>
      <div className='back'>
        <BackBtn />
      </div>
      <p className='product-detail-name'>{selectedProduct.marca} {selectedProduct.modelo}</p>
      <div className='product-detail-info-container'>
        <ImagesGrid />
        <div className='product-detail-text-container'>
          <p className='product-detail-daily-price'>
            ${selectedProduct.precioDia}
            <span className='product-detail-day-text'>{pageData.productCard.dia}</span>
          </p>
          <p className='product-detail-day-description'>{selectedProduct.descripcion}</p>
          <ProductFeatures product={selectedProduct} type='detail' />
          <ProductCharacteristics characteristics={selectedProduct.caracteristicas} />
          <RentNowBtn />
        </div>
      </div>
    </div>
  )
}

export default ProductDetailCard
