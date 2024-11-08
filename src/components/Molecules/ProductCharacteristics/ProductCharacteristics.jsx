import './productCharacteristics.css'
import { pageData } from '../../../data/page'

const ProductCharacteristics = ({ characteristics }) => {
  return (
    <div className='product-characteristics-container'>
      <p className='product-characteristics-title'>{pageData.characteristics.title}</p>
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
