/* eslint-disable react/prop-types */
import { PiEngine, PiSpeedometer, PiTimer } from 'react-icons/pi'

import './productFeatures.css'
import { pageData } from '../../../data/page'

const ProductFeatures = ({ product }) => {
  return (
    <div className='product-features-container'>
      <div className='product-features-card'>
        <PiEngine className='product-features-text' />
        <p>{product.potenciaHp} {pageData.productCard.features.horsepower}</p>
      </div>
      <div className='product-features-card'>
        <PiSpeedometer className='product-features-text' />
        <p>{product.velocidad} {pageData.productCard.features.speed}</p>
      </div>
      <div className='product-features-card'>
        <PiTimer className='product-features-text' />
        <p>{pageData.productCard.features.timeframe} {product.aceleracion} {pageData.productCard.features.acceleration}</p>
      </div>
    </div>
  )
}

export default ProductFeatures
