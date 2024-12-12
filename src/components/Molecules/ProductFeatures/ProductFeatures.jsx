import { useTranslation } from 'react-i18next'
import { PiEngine, PiSpeedometer, PiTimer } from 'react-icons/pi'

import './productFeatures.css'

const ProductFeatures = ({ product, type }) => {
  const { t } = useTranslation()

  return (
    <div className={`product-features-container ${type === 'product' ? 'mx-4' : 'mx-0'}`}>
      <div className='product-features-card'>
        <PiEngine className='product-features-icons' />
        <p className='product-features-text'>{product.potenciaHP} {t('horsepower')}</p>
      </div>
      <div className='product-features-card'>
        <PiSpeedometer className='product-features-icons' />
        <p className='product-features-text'>{product.velocidad} {t('speed')}</p>
      </div>
      <div className='product-features-card'>
        <PiTimer className='product-features-icons' />
        <p className='product-features-text'>{t('0-100')} {product.aceleracion} {t('acceleration')}</p>
      </div>
    </div>
  )
}

export default ProductFeatures
