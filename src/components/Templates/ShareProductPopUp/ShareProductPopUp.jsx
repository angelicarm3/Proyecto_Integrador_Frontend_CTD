import { useState } from 'react'

import { AiOutlineClose } from 'react-icons/ai'
import { FaWhatsapp } from 'react-icons/fa'
import { MdOutlineEmail } from 'react-icons/md'
import { RiTwitterXLine } from 'react-icons/ri'
import { EmailShareButton, TwitterShareButton, WhatsappShareButton } from 'react-share'

import ProductCharacteristics from '../../Molecules/ProductCharacteristics/ProductCharacteristics'
import './ShareProductPopUp.css'

const ShareProductPopUp = ({ product, onClose }) => {
  const [comment, setComment] = useState('')

  const img = product.imagenes[0].url
  const shareUrl = window.location.href
  const title = '¡Descubre este auto en alquiler!'
  const productTitle = `${product.marca} ${product.modelo}`
  const descriptionWithComment = `${product.descripcion + '\n\n'}${comment || ''}`

  const characteristics = product.caracteristicas
  return (
    <div className='shareProduct-container'>
      <div className='shareProduct-modal-container'>
        <AiOutlineClose
          onClick={onClose}
          className='shareProduct-close-btn'
        />
        <section className='shareProduct-section'>
          <div className='shareProduct-image-container'>
            <img
              src={img}
              alt={product.modelo}
              className='shareProduct-image'
            />
          </div>

          <div className='shareProduct-data-container'>
            <h2 className='shareProduct-title'>{product.marca} {product.modelo}</h2>
            <p className='shareProduct-price'>${product.precioDia}
              <span className='shareProduct-span'>/day</span>
            </p>
            <ProductCharacteristics characteristics={product.caracteristicas} type='share' />
            {/* <div className='shareProduct-characteristics-container'>
              {
                characteristics.map((characteristic) => (
                  <div className='shareProduct-characteristics-div' key={characteristic.id}>
                    <img src={characteristic.icono} className='shareProduct-icons' />

                    <p className='shareProduct-p'>
                      {characteristic.nombre.length > 20
                        ? characteristic.nombre.slice(0, 20) + '...'
                        : characteristic.nombre}
                    </p>
                  </div>
                ))
              }
            </div> */}
            <p className='shareProduct-description'>{product.descripcion}</p>
            <textarea
              placeholder='Deja tu comentario'
              className='input h-16 text-black1 pt-2'
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <div className='shareProduct-container-icons'>
              <span className='shareProduct-share-span'>Compartir</span>
              <WhatsappShareButton
                className='shareProduct-icon-btn'
                url={`${title}\n\n${productTitle}\n${descriptionWithComment}\n\nImagen: ${img}\n\n${shareUrl}`}
              >
                <FaWhatsapp className='shareProduct-media-btn' />
              </WhatsappShareButton>
              <TwitterShareButton
                className='shareProduct-icon-btn'
                url={`${title}\n\n${productTitle}\n${descriptionWithComment}\nImagen: ${img}\n${shareUrl}`}
              >
                <RiTwitterXLine className='shareProduct-media-btn text-2xl' />
              </TwitterShareButton>
              <EmailShareButton
                className='shareProduct-icon-btn'
                url={`${title}\n\n${productTitle}\n${descriptionWithComment}\nImagen: ${img}\n${shareUrl}`}
              >
                <MdOutlineEmail className='shareProduct-media-btn' />
              </EmailShareButton>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default ShareProductPopUp
