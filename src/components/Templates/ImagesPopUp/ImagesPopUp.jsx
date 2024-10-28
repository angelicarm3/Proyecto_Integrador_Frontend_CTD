/* eslint-disable react/prop-types */
import { useNavigate, useParams } from 'react-router-dom'
import { AiOutlineClose } from 'react-icons/ai'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'

import './imagesPopUp.css'
import { responsive } from '../../../data/responsive'
import { productsData } from '../../../data/products'

const ImagesPopUp = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const product = productsData.products.filter((product) => product.id === parseInt(id))

  return (
    <div className='pop-up-bg'>
      <AiOutlineClose className='close-btn' size={30} onClick={() => navigate(-1)} />

      <div className='images-pop-up-carousel'>
        <Carousel
          responsive={responsive}
          showDots
        >
          {
          product[0]?.imagenes.map((imagen, index) => (
            <img key={index} src={imagen.img} alt='' className='images-pop-up-img' />
          ))
        }
        </Carousel>
      </div>
    </div>
  )
}

export default ImagesPopUp
