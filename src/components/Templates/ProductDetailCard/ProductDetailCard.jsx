import { useState } from 'react'
import { FiShare2 } from 'react-icons/fi'
import { useSelector } from 'react-redux'

import { pageLabels } from '../../../data/pageLabels'
import BackBtn from '../../Atoms/BackBtn/BackBtn'
import FavBtn from '../../Atoms/FavBtn/FavBtn'
import RentNowBtn from '../../Atoms/RentNowBtn/RentNowBtn'
import ProductCharacteristics from '../../Molecules/ProductCharacteristics/ProductCharacteristics'
import ProductFeatures from '../../Molecules/ProductFeatures/ProductFeatures'
import ImagesGrid from '../../Organisms/ImagesGrid/ImagesGrid'
import RequireLoginPopup from '../RequireLoginPopup/RequireLoginPopup'
import ShareProductPopUp from '../ShareProductPopUp/ShareProductPopUp'
import './productDetailCard.css'

const ProductDetailCard = () => {
  const [isShareModalOpen, setShareModalOpen] = useState(false)
  const selectedProduct = useSelector((state) => state.product.selectedProduct)
  const [showRequireLoginPopup, setShowRequireLoginPopup] = useState(false)

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
            <div className='flex gap-3'>
              <FavBtn product={selectedProduct} setShowRequireLoginPopup={setShowRequireLoginPopup} />
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
          <ShareProductPopUp
            product={selectedProduct}
            onClose={() => setShareModalOpen(false)}
          />
        )
      }
      {
        showRequireLoginPopup &&
          <RequireLoginPopup onClose={() => setShowRequireLoginPopup(false)} />
      }
    </div>
  )
}

export default ProductDetailCard
