import { useNavigate } from 'react-router-dom'

import './productCard.css'
import { pageLabels } from '../../../data/pageLabels'
import RentNowBtn from '../../Atoms/RentNowBtn/RentNowBtn'
import ProductFeatures from '../../Molecules/ProductFeatures/ProductFeatures'

const ProductCard = ({ product }) => {
  const navigate = useNavigate()
  const mainImg = product.imagenes.filter((img) => img.esPrincipal)

  return (
    <div className='product-card-container' onClick={() => navigate(`/producto/${product.id}`)}>
      <div className='product-info-container'>
        <img className='product-card-img' src={mainImg[0].url} alt='' />
        <p className='product-name'>{product.marca} {product.modelo}</p>
        <p className='product-daily-price'>
          ${product.precioDia}
          <span className='product-day-text'>{pageLabels.productCard.dia}</span>
        </p>
      </div>
      <div className='product-info-container'>
        <ProductFeatures product={product} type='product' />
        <RentNowBtn />
      </div>
    </div>
  )
}

export default ProductCard
