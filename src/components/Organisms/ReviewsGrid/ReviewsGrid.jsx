import { FaRegStar, FaStar } from 'react-icons/fa'
import Rating from 'react-rating'
import { useTranslation } from 'react-i18next'

import isoGold from '../../../assets/brand/isoGold.svg'

const ReviewsGrid = ({ canComment, reviews, onReviewClick }) => {
  const { t } = useTranslation()

  return (
    <div className='w-full flex flex-col items-center gap-8 mt-4'>
      <div className='w-full md:min-w-[784px] md:max-w-[784px] flex flex-col md:flex-row justify-between items-center gap-4'>
        <p className='product-detail-name w-fit mb-0 text-xl text-white text-center'>{t('comments')}</p>
        {
          canComment &&
            <button onClick={onReviewClick} className='primary-btn text-black1 rounded-lg px-4'>{t('rateYourExperience')}</button>
        }
      </div>
      <div className='w-full md:min-w-[784px] md:max-w-[784px] max-h-[350px] flex flex-wrap justify-between items-center gap-6 overflow-y-auto'>
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
              <p>{t('thisProductDoesNotHaveCommentsYet')}</p>
              <img src={isoGold} alt='Logo de la marca' className='h-[150px] mt-6' />
            </div>
        }
      </div>
    </div>
  )
}

export default ReviewsGrid
