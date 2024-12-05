import { useEffect, useState } from 'react'

import Calendar from 'react-calendar'
import { FiShare2 } from 'react-icons/fi'
import { useSelector } from 'react-redux'

import { pageLabels } from '../../../data/pageLabels'
import BackBtn from '../../Atoms/BackBtn/BackBtn'
import FavBtn from '../../Atoms/FavBtn/FavBtn'
import RentNowBtn from '../../Atoms/RentNowBtn/RentNowBtn'
import ProductCharacteristics from '../../Molecules/ProductCharacteristics/ProductCharacteristics'
import ProductFeatures from '../../Molecules/ProductFeatures/ProductFeatures'
import ProductStars from '../../Molecules/ProductStars/ProductStars'
import ImagesGrid from '../../Organisms/ImagesGrid/ImagesGrid'
import ReviewsGrid from '../../Organisms/ReviewsGrid/ReviewsGrid'
import CreateReviewPopUp from '../CreateReviewPopUp/CreateReviewPopUp'
import RequireLoginPopup from '../RequireLoginPopup/RequireLoginPopup'
import ShareProductPopUp from '../ShareProductPopUp/ShareProductPopUp'
import './productDetailCard.css'
import ProductAvailability from '../../Organisms/ProductAvailability/ProductAvailability'

const ProductDetailCard = ({ onSuccess }) => {
  const [isShareModalOpen, setShareModalOpen] = useState(false)
  const selectedProduct = useSelector((state) => state.product.selectedProduct)
  const { loggedUser } = useSelector((state) => state.loginRegister)
  const { bookins } = useSelector((state) => state.bookins)
  const [showRequireLoginPopup, setShowRequireLoginPopup] = useState(false)
  const [showReviewPopUp, setShowReviewPopUp] = useState(false)
  const [reviews, setReviews] = useState([])
  const [canComment, setCanComment] = useState([])

  useEffect(() => {
    setReviews([...selectedProduct.resenas].sort((a, b) => b.id - a.id))

    const hasBooked = bookins.some(
      (bookin) => bookin.usuario.id === loggedUser.id && bookin.auto.id === selectedProduct.id
    )
    const hasComented = selectedProduct.resenas.some(
      (review) => parseInt(review.usuarioId) === loggedUser.id
    )

    setCanComment(hasBooked && !hasComented)
  }, [selectedProduct, loggedUser])

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
        <div className='h-full flex flex-col justify-between items-center lg:items-start gap-3'>
          <ImagesGrid />
          <ProductStars product={selectedProduct} />
        </div>
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
      <ProductAvailability product={selectedProduct} />
      <ReviewsGrid canComment={canComment} reviews={reviews} onReviewClick={() => setShowReviewPopUp(true)} />

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
      {
        showReviewPopUp &&
          <CreateReviewPopUp onClose={() => setShowReviewPopUp(false)} onSuccess={onSuccess} />
      }
    </div>
  )
}

export default ProductDetailCard
