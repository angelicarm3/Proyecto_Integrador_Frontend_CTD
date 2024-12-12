import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { pageLabels } from '../../../data/pageLabels'
import ProductFeatures from '../../Molecules/ProductFeatures/ProductFeatures'
import './recommendationCard.css'

const RecommendationCard = ({ product }) => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const mainImg = product.imagenes.filter((img) => img.esPrincipal)

  return (
    <div className='clickable recommendation-card-container' onClick={() => navigate(`/producto/${product.id}`)}>
      <img className='recommendation-card-img' src={mainImg[0].url} alt='' />
      <div className='recommendation-info-container'>
        <p className='recommendation-name'>{product.marca} {product.modelo}</p>
        <p className='recommendation-daily-price'>
          ${product.precioDia}
          <span className='recommendation-day-text'>{t('perDay')}</span>
        </p>
        <ProductFeatures product={product} type='recommendation' />
        <div className='primary-btn rent-now-btn clickable'>{t('seeDetails')}
        </div>
      </div>
    </div>

  )
}

export default RecommendationCard
