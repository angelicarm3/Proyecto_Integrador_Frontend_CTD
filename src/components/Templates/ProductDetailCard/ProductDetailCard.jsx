import { useEffect, useState } from 'react'
import { FiShare2 } from 'react-icons/fi'
import { useSelector } from 'react-redux'

import { FaRegStar, FaStar } from 'react-icons/fa'
import Rating from 'react-rating'
import isoGold from '../../../assets/brand/isoGold.svg'
import { pageLabels } from '../../../data/pageLabels'
import BackBtn from '../../Atoms/BackBtn/BackBtn'
import FavBtn from '../../Atoms/FavBtn/FavBtn'
import RentNowBtn from '../../Atoms/RentNowBtn/RentNowBtn'
import ProductCharacteristics from '../../Molecules/ProductCharacteristics/ProductCharacteristics'
import ProductFeatures from '../../Molecules/ProductFeatures/ProductFeatures'
import ProductStars from '../../Molecules/ProductStars/ProductStars'
import ImagesGrid from '../../Organisms/ImagesGrid/ImagesGrid'
import CreateReviewPopUp from '../CreateReviewPopUp/CreateReviewPopUp'
import RequireLoginPopup from '../RequireLoginPopup/RequireLoginPopup'
import ShareProductPopUp from '../ShareProductPopUp/ShareProductPopUp'
import './productDetailCard.css'

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
    setReviews(selectedProduct.resenas)

    const hasBooked = bookins.some(
      (bookin) => bookin.usuario.id === loggedUser.id && bookin.auto.id === selectedProduct.id
    )
    const hasComented = selectedProduct.resenas.some(
      (review) => review.nombreUsuario === loggedUser.nombre
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

      <div className='w-full flex flex-col items-center gap-8 mt-8'>
        <div className='w-full flex flex-col md:flex-row justify-between items-center gap-4'>
          <p className='product-detail-name w-fit mb-0 text-xl text-white text-center'>Comentarios</p>
          {
            canComment &&
              <button onClick={() => setShowReviewPopUp(true)} className='primary-btn text-black1 rounded-lg px-4'>Califica tu experiencia</button>
          }
        </div>
        <div className='w-full md:w-[784px] max-h-[350px] flex flex-wrap justify-between items-center gap-6 overflow-y-auto'>
          {
          reviews &&
            reviews.map((review, index) => (
              <div key={index} className='review-card w-full md:max-w-[360px] flex flex-col border-b md:border-none border-gray3 px-4 pb-6 gap-2'>
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
                {
                  review.comentario &&
                    <p>{review.comentario}</p>
                }

              </div>
            ))
          }

          {
            reviews?.length === 0 &&
              <div className='w-full h-[300px] flex flex-col justify-center items-center text-gray3 text-lg'>
                <p>Este producto aún no tiene comentarios</p>
                <img src={isoGold} alt='Logo de la marca' className='h-[150px] mt-6' />
              </div>
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
      {
        showReviewPopUp &&
          <CreateReviewPopUp onClose={() => setShowReviewPopUp(false)} onSuccess={onSuccess} />
      }
    </div>
  )
}

export default ProductDetailCard
