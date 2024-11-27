import { useState } from 'react'
import { useSelector } from 'react-redux'
import { FiShare2 } from 'react-icons/fi'

import './productDetailCard.css'
import { pageLabels } from '../../../data/pageLabels'
import BackBtn from '../../Atoms/BackBtn/BackBtn'
import ImagesGrid from '../../Organisms/ImagesGrid/ImagesGrid'
import ProductFeatures from '../../Molecules/ProductFeatures/ProductFeatures'
import ProductCharacteristics from '../../Molecules/ProductCharacteristics/ProductCharacteristics'
import RentNowBtn from '../../Atoms/RentNowBtn/RentNowBtn'
import ShareProduct from '../../Molecules/ShareProduct/ShareProduct'

const ProductDetailCard = () => {
  const [isShareModalOpen, setShareModalOpen] = useState(false)
  const selectedProduct = useSelector((state) => state.product.selectedProduct)

  const handleShareClick = () => {
    setShareModalOpen(true)
  }

  return (
    <div className='main-section product-detail-card-container'>
      <div className='back'>
        <BackBtn />
      </div>
      <p className='product-detail-name'>{selectedProduct.marca} {selectedProduct.modelo}</p>
      <div className='product-detail-info-container'>
        <ImagesGrid />
        <div className='product-detail-text-container'>
          <div className='features-container'>
            <p className='product-detail-daily-price'>
              ${selectedProduct.precioDia}
              <span className='product-detail-day-text'>{pageLabels.productCard.dia}</span>
            </p>
            <div>
              <FiShare2 className='action-btn' onClick={handleShareClick} />
            </div>
          </div>
          <p className='product-detail-day-description'>{selectedProduct.descripcion}</p>
          <ProductFeatures product={selectedProduct} type='detail' />
          <ProductCharacteristics characteristics={selectedProduct.caracteristicas} />
          <RentNowBtn />
        </div>
      </div>
      {
        isShareModalOpen && (
          <ShareProduct
            product={selectedProduct}
            onClose={() => setShareModalOpen(false)}
          />
        )
      }
    </div>
  )
}

export default ProductDetailCard
