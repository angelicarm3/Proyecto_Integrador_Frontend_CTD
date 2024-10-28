/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom'

import './recommendationCard.css'
import { pageData } from '../../../data/page'
import RentNowBtn from '../../Atoms/RentNowBtn/RentNowBtn'
import ProductFeatures from '../../Molecules/ProductFeatures/ProductFeatures'

const ProductCard = ({ product }) => {
  const navigate = useNavigate()
  const mainImg = product.imagenes.filter((img) => img.es_principal)

  return (
    <div className='recommendation-card-container' onClick={() => navigate(`/producto/${product.id}`)}>
      <img className='recommendation-card-img' src={mainImg[0].img} alt='' />
      <div className='recommendation-info-container'>
        <p className='recommendation-name'>{product.marca} {product.modelo}</p>
        <p className='recommendation-daily-price'>
          ${product.precioDia}
          <span className='recommendation-day-text'>{pageData.productCard.dia}</span>
        </p>
        <ProductFeatures product={product} type='recommendation' />
        <RentNowBtn />
      </div>
    </div>

  )
}

export default ProductCard
