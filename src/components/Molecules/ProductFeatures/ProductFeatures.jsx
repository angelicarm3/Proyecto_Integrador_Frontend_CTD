/* eslint-disable react/prop-types */
import { PiEngine, PiSpeedometer, PiTimer } from 'react-icons/pi'

import './productFeatures.css'
import { pageData } from '../../../data/page'

const ProductFeatures = ({ product, type }) => {
  return (
    <div className={`product-features-container ${type === 'product' ? 'mx-4' : 'mx-0'}`}>
      <div className='product-features-card'>
        <PiEngine className='product-features-icons' />
        <p className='product-features-text'>{product.potenciaHp} {pageData.productCard.features.horsepower}</p>
      </div>
      <div className='product-features-card'>
        <PiSpeedometer className='product-features-icons' />
        <p className='product-features-text'>{product.velocidad} {pageData.productCard.features.speed}</p>
      </div>
      <div className='product-features-card'>
        <PiTimer className='product-features-icons' />
        <p className='product-features-text'>{pageData.productCard.features.timeframe} {product.aceleracion} {pageData.productCard.features.acceleration}</p>
      </div>
    </div>
  )
}

export default ProductFeatures
