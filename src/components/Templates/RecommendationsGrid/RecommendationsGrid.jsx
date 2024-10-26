import './recommendationsGrid.css'
import { productsData } from '../../../data/products'
import RecommendationCard from '../../Organisms/RecommendationCard/RecommendationCard'

const RecommendationsGrid = () => {
  return (
    <section className='recommendations-grid-container'>
      <p className='title recommendations-grid-title'>Recomendados</p>
      <div className='recommendations-grid'>
        {
          productsData.products.map((product, index) => (
            index < 2 &&
              <RecommendationCard key={index} product={product} />
          ))
        }
      </div>
    </section>
  )
}

export default RecommendationsGrid
