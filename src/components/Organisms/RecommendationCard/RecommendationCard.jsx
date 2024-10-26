/* eslint-disable react/prop-types */
import './recommendationCard.css'
import { pageData } from '../../../data/page'
import RentNowBtn from '../../Atoms/RentNowBtn/RentNowBtn'
import ProductFeatures from '../../Molecules/ProductFeatures/ProductFeatures'

const ProductCard = ({ product }) => {
  const mainImg = product.imagenes.filter((img) => img.es_principal)
  console.log(product)
  return (
    <div className='recommendation-card-container'>
      <img className='recommendation-card-img' src={mainImg[0].img} alt='' />
      <div className='recommendation-info-container'>
        <p className='recommendation-name'>{product.marca} {product.modelo}</p>
        <p className='recommendation-daily-price'>
          ${product.precioDia}
          <span className='recommendation-day-text'>{pageData.productCard.dia}</span>
        </p>
        <ProductFeatures product={product} />
        <RentNowBtn />
      </div>
    </div>

  )
}

export default ProductCard
