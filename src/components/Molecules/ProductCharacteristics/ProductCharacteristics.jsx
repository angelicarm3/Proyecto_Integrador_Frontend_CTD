import { useTranslation } from 'react-i18next'

import './productCharacteristics.css'

const ProductCharacteristics = ({ characteristics, type }) => {
  const { t } = useTranslation()

  return (
    <div className='product-characteristics-container'>
      {
        type !== 'share' &&
          <p className='product-characteristics-title'>{t('characteristics')}</p>
      }
      <div className='product-characteristics-grid'>
        {
        characteristics.map((characteristic, index) => (
          <div key={index} className='product-characteristics-card'>
            <div className='product-characteristics-icons'>
              <img src={characteristic.icono} alt='' />
            </div>
            <p>{characteristic.nombre}</p>
          </div>
        ))
        }
      </div>
    </div>
  )
}

export default ProductCharacteristics
