import { useEffect, useState } from 'react'
import { FiShare2 } from 'react-icons/fi'
import { useSelector } from 'react-redux'

import { FaRegStar, FaStar } from 'react-icons/fa'
import Rating from 'react-rating'
import { pageLabels } from '../../../data/pageLabels'
import BackBtn from '../../Atoms/BackBtn/BackBtn'
import FavBtn from '../../Atoms/FavBtn/FavBtn'
import RentNowBtn from '../../Atoms/RentNowBtn/RentNowBtn'
import ProductCharacteristics from '../../Molecules/ProductCharacteristics/ProductCharacteristics'
import ProductFeatures from '../../Molecules/ProductFeatures/ProductFeatures'
import ProductStars from '../../Molecules/ProductStars/ProductStars'
import ImagesGrid from '../../Organisms/ImagesGrid/ImagesGrid'
import RequireLoginPopup from '../RequireLoginPopup/RequireLoginPopup'
import ShareProductPopUp from '../ShareProductPopUp/ShareProductPopUp'
import './productDetailCard.css'

const ProductDetailCard = () => {
  const [isShareModalOpen, setShareModalOpen] = useState(false)
  const selectedProduct = useSelector((state) => state.product.selectedProduct)
  const [showRequireLoginPopup, setShowRequireLoginPopup] = useState(false)
  const [reviews, setReviews] = useState([])

  useEffect(() => {
    setReviews(selectedProduct.resenas)
  }, [selectedProduct])

  const handleShareClick = () => {
    setShareModalOpen(true)
  }

  const ratingChanged = (newRating) => {
    console.log(newRating)
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

      <div className='flex flex-col mt-8'>
        <p className='product-detail-name text-xl text-white text-center'>Comentarios</p>
        <div className='max-h-[350px] flex flex-wrap justify-center items-center gap-6 md:gap-x-16 overflow-y-auto'>
          {
          reviews &&
            reviews.map((review, index) => (
              <div key={index} className='review-card w-full md:w-5/12 flex flex-col border-b md:border-none border-gray3 px-4 pb-6 gap-2'>
                <div className='flex justify-between'>
                  <p className='text-lg'>{review.nombreUsuario}</p>
                  <p className='text-gray3'>{review.fechaCreacion}</p>
                </div>
                <Rating
                  initialRating={review.puntuacion}
                  readonly
                  emptySymbol={<FaRegStar href='#icon-star-empty' className='text-gray3 text-xl' />}
                  fullSymbol={<FaStar href='#icon-star-full' className='text-yellow1 text-xl' />}
                />
                <p>{review.comentario}</p>

              </div>
            ))
        }
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
