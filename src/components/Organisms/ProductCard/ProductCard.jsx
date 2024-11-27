import { useNavigate } from 'react-router-dom'

import { pageLabels } from '../../../data/pageLabels'
import FavBtn from '../../Atoms/FavBtn/FavBtn.jsx'
import RentNowBtn from '../../Atoms/RentNowBtn/RentNowBtn'
import ProductFeatures from '../../Molecules/ProductFeatures/ProductFeatures'
import './productCard.css'

const ProductCard = ({ product, setShowRequireLoginPopup }) => {
  const navigate = useNavigate()
  const mainImg = product.imagenes.filter((img) => img.esPrincipal)

  return (
    <div className='relative'>
      <div className='product-card-container' onClick={() => navigate(`/producto/${product.id}`)}>
        <div className='product-info-container h-full'>
          <img className='product-card-img' src={mainImg[0].url} alt='' />
          <div className='h-full flex flex-col justify-between'>
            <p className='product-name'>{product.marca} {product.modelo}</p>
            <p className='product-daily-price'>
              ${product.precioDia}
              <span className='product-day-text'>{pageLabels.productCard.dia}</span>
            </p>
          </div>
        </div>
        <div className='product-info-container h-fit'>
          <ProductFeatures product={product} type='product' />
          <RentNowBtn />
        </div>
      </div>
      <FavBtn product={product} setShowRequireLoginPopup={setShowRequireLoginPopup} />
    </div>
  )
}

export default ProductCard
