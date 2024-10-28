/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { AiOutlineClose } from 'react-icons/ai'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'

import './imagesPopUp.css'
import { responsive } from '../../../data/responsive'

const ImagesPopUp = () => {
  const navigate = useNavigate()
  const selectedProduct = useSelector((state) => state.product.selectedProduct)

  return (
    <div className='pop-up-bg'>
      <AiOutlineClose className='close-btn' size={30} onClick={() => navigate(-1)} />

      <div className='images-pop-up-carousel'>
        <Carousel
          responsive={responsive}
          showDots
        >
          {
          selectedProduct?.imagenes.map((imagen, index) => (
            <img key={index} src={imagen.img} alt='' className='images-pop-up-img' />
          ))
        }
        </Carousel>
      </div>
    </div>
  )
}

export default ImagesPopUp
