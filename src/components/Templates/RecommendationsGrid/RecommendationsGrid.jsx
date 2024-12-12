import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import RecommendationCard from '../../Organisms/RecommendationCard/RecommendationCard'
import './recommendationsGrid.css'

const RecommendationsGrid = () => {
  const { t } = useTranslation()

  const recommendedProducts = useSelector((state) => state.product.recommendedProducts)

  return (
    <section className='recommendations-grid-container'>
      <p className='title recommendations-grid-title'>{t('recommendations')}</p>
      <div className='recommendations-grid'>
        {
          recommendedProducts?.map((product, index) => (
            index < 2 &&
              <RecommendationCard key={index} product={product} />
          ))
        }
      </div>
    </section>
  )
}

export default RecommendationsGrid
