import { AiOutlineClose } from 'react-icons/ai'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { responsive } from '../../../data/responsive'
import './imagesPopUp.css'

const ImagesPopUp = () => {
  const navigate = useNavigate()
  const selectedProduct = useSelector((state) => state.product.selectedProduct)

  return (
    <div className='modal-wrapper pop-up-bg'>
      {
        selectedProduct &&
          <div className='images-pop-up-carousel relative'>
            <Carousel
              responsive={responsive}
              showDots
            >
              {
                selectedProduct.imagenes?.map((imagen, index) => (
                  <img key={index} src={imagen.url} alt='' className='images-pop-up-img' />
                ))
              }
            </Carousel>
            <AiOutlineClose className='clickable close-btn absolute top-4 right-4 text-yellow1' size={45} onClick={() => navigate(-1)} />
          </div>
      }
    </div>
  )
}

export default ImagesPopUp
