import { useEffect, useState } from 'react'

import { useTranslation } from 'react-i18next'
import { FiShare2 } from 'react-icons/fi'
import { useSelector } from 'react-redux'

import { pageLabels } from '../../../data/pageLabels'
import { translateText } from '../../../service/translateText'
import BackBtn from '../../Atoms/BackBtn/BackBtn'
import FavBtn from '../../Atoms/FavBtn/FavBtn'
import RentNowBtn from '../../Atoms/RentNowBtn/RentNowBtn'
import ProductCharacteristics from '../../Molecules/ProductCharacteristics/ProductCharacteristics'
import ProductFeatures from '../../Molecules/ProductFeatures/ProductFeatures'
import ProductStars from '../../Molecules/ProductStars/ProductStars'
import ImagesGrid from '../../Organisms/ImagesGrid/ImagesGrid'
import ProductAvailability from '../../Organisms/ProductAvailability/ProductAvailability'
import ReviewsGrid from '../../Organisms/ReviewsGrid/ReviewsGrid'
import CreateReviewPopUp from '../CreateReviewPopUp/CreateReviewPopUp'
import ShareProductPopUp from '../ShareProductPopUp/ShareProductPopUp'
import './productDetailCard.css'

const ProductDetailCard = ({ onSuccess, onRentClick, setShowRequireLoginPopup, reload }) => {
  const { i18n } = useTranslation()
  const [isShareModalOpen, setShareModalOpen] = useState(false)
  const selectedProduct = useSelector((state) => state.product.selectedProduct)
  const { loggedUser } = useSelector((state) => state.loginRegister)
  const { bookins } = useSelector((state) => state.bookins)
  const [showReviewPopUp, setShowReviewPopUp] = useState(false)
  const [reviews, setReviews] = useState([])
  const [canComment, setCanComment] = useState([])

  const [productDescription, setProductDescription] = useState()

  useEffect(() => {
    const fetchTranslation = async () => {
      const translatedDescription = await translateText(selectedProduct.descripcion)
      setProductDescription(translatedDescription)
    }

    if (selectedProduct.descripcion) {
      fetchTranslation()
    }
  }, [selectedProduct.descripcion])

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
              <FiShare2 className='clickable action-btn' onClick={handleShareClick} />
            </div>
          </div>
          {
            i18n.language === 'en'
              ? <p className='product-detail-day-description'>{productDescription}</p>
              : <p className='product-detail-day-description'>{selectedProduct.descripcion}</p>
          }
          <ProductFeatures product={selectedProduct} type='detail' />
          <ProductCharacteristics characteristics={selectedProduct.caracteristicas} />
          <RentNowBtn onRentClick={onRentClick} />
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
        showReviewPopUp &&
          <CreateReviewPopUp onClose={() => setShowReviewPopUp(false)} onSuccess={onSuccess} />
      }
    </div>
  )
}

export default ProductDetailCard
