import { pageLabels } from '../../../data/pageLabels'
import './productCharacteristics.css'

const ProductCharacteristics = ({ characteristics, type }) => {
  return (
    <div className='product-characteristics-container'>
      {
        type !== 'share' &&
          <p className='product-characteristics-title'>{pageLabels.characteristics.title}</p>
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
