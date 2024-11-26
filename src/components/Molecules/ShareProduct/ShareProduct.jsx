import { useState } from 'react'
import './ShareProduct.css'

import { WhatsappShareButton } from 'react-share'

import { IoLogoWhatsapp } from 'react-icons/io'

const ShareProduct = ({ product, onClose }) => {
  const [comment, setComment] = useState('')

  const img = product.imagenes[0].url
  const shareUrl = window.location.href
  const title = `${product.marca} ${product.modelo}`
  const descriptionWithComment = `${comment ? comment + '\n\n' : ''}${product.descripcion}`

  const characteristics = product.caracteristicas
  return (
    <div className='shareProduct-container'>
      <div className='shareProduct-modal-container'>
        <button
          onClick={onClose}
          className='shareProduct-close-btn'
        >
          ✕
        </button>
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
            <p className='shareProduct-price'>{product.precioDia}
              <span className='shareProduct-span'>/day</span>
            </p>
            <div className='shareProduct-characteristics-container'>
              {
                characteristics.map((characteristic) => (
                  <div className='shareProduct-characteristics-div' key={characteristic.id}>
                    <img src={characteristic.icono} className='shareProduct-icons' />

                    <p className='shareProduct-p'>
                      {characteristic.nombre.length > 18
                        ? characteristic.nombre.slice(0, 18) + '...'
                        : characteristic.nombre.length > 10
                          ? characteristic.nombre.slice(0, 10) + '\n' + characteristic.nombre.slice(10)
                          : characteristic.nombre}
                    </p>
                  </div>
                ))
              }
            </div>
            <p className='shareProduct-description'>{product.descripcion}</p>
            <textarea
              placeholder='Deja tu comentario'
              className='shareProduct-textarea'
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <div className='shareProduct-container-icons'>
              <span className='shareProduct-share-span'>Compartir</span>
              <WhatsappShareButton
                className='shareProduct-icon-btn'
                url={`${shareUrl}\n\n${title}\n\n${descriptionWithComment}\n\n Link de la imagen : ${img}`}
              >
                <IoLogoWhatsapp className='shareProduct-media-btn' />
              </WhatsappShareButton>

            </div>
          </div>

        </section>
      </div>
    </div>
  )
}

export default ShareProduct
