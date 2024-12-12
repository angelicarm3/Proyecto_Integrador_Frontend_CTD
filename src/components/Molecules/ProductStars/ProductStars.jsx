import { useEffect, useState } from 'react'

import { useTranslation } from 'react-i18next'
import { FaRegStar, FaStar } from 'react-icons/fa'

import Rating from 'react-rating'
import { useLocation } from 'react-router-dom'

const ProductStars = ({ product }) => {
  const location = useLocation()
  const { t } = useTranslation()
  const [totalReviews, setTotalReviews] = useState(0)
  const [average, setAverage] = useState(0)

  useEffect(() => {
    if (product) {
      const reviews = product.resenas
      const averageScore = reviews.reduce((total, review) => total + review.puntuacion, 0) / reviews.length

      setTotalReviews(reviews.length)
      setAverage(reviews.length > 0 ? parseFloat(averageScore.toFixed(1)) : 0)
    }
  }, [product])

  return (
    <div className={`flex items-center  ${location.pathname.includes('/producto/') ? 'gap-3' : 'gap-2 px-4'}`}>
      <Rating
        initialRating={average}
        readonly
        emptySymbol={<FaRegStar href='#icon-star-empty' className={`text-gray3 ${location.pathname.includes('/producto/') ? 'text-3xl' : 'text-xl'}`} />}
        fullSymbol={<FaStar href='#icon-star-full' className={`text-yellow1 ${location.pathname.includes('/producto/') ? 'text-3xl' : 'text-xl'}`} />}
      />
      <p className={`text-white mb-1 ${location.pathname.includes('/producto/') ? 'text-xl' : 'text-base'}`}>{average}</p>
      <p className={`text-gray3 mb-1 ${location.pathname.includes('/producto/') ? 'text-base' : 'text-sm'}`}>({totalReviews} {t('reviews')})</p>
    </div>
  )
}

export default ProductStars
