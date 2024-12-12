import { useState } from 'react'

import { useTranslation } from 'react-i18next'
import { AiOutlineClose } from 'react-icons/ai'
import { FaWhatsapp } from 'react-icons/fa'
import { MdOutlineEmail } from 'react-icons/md'
import { RiTwitterXLine } from 'react-icons/ri'
import { EmailShareButton, TwitterShareButton, WhatsappShareButton } from 'react-share'

import ProductCharacteristics from '../../Molecules/ProductCharacteristics/ProductCharacteristics'
import './ShareProductPopUp.css'

const ShareProductPopUp = ({ product, onClose }) => {
  const { t } = useTranslation()
  const [comment, setComment] = useState('')

  const img = product.imagenes[0].url
  const shareUrl = location.pathname.includes('/producto/') ? window.location.href : window.location.href + `producto/${product.id}`
  const title = `${t('discoverThisRentCar')}`
  const productTitle = `${product.marca} ${product.modelo}`
  const descriptionWithComment = `${product.descripcion + '\n\n'}${comment || ''}`

  return (
    <div className='shareProduct-container'>
      <div className='shareProduct-modal-container'>
        <AiOutlineClose
          onClick={onClose}
          className='clickable shareProduct-close-btn'
        />
        <section className='shareProduct-section'>
          <div className='shareProduct-image-container'>
            <img
              src={img}
              alt={product.modelo}
              className='shareProduct-image'
            />
          </div>

          <div className='shareProduct-data-container text-white'>
            <h2 className='shareProduct-title'>{product.marca} {product.modelo}</h2>
            <p className='shareProduct-price'>${product.precioDia}
              <span className='shareProduct-span'>{t('perDay')}</span>
            </p>
            <ProductCharacteristics characteristics={product.caracteristicas} type='share' />
            <p className='shareProduct-description'>{product.descripcion}</p>
            <textarea
              placeholder={t('leaveYourComment')}
              className='input h-16 text-black1 pt-2'
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <div className='shareProduct-container-icons'>
              <span className='shareProduct-share-span'>{t('share')}</span>
              <WhatsappShareButton
                className='clickable shareProduct-icon-btn'
                url={`${title}\n\n${productTitle}\n${descriptionWithComment}\n\n${img}\n\n${shareUrl}`}
              >
                <FaWhatsapp className='clickable shareProduct-media-btn' />
              </WhatsappShareButton>
              <TwitterShareButton
                className='clickable shareProduct-icon-btn'
                url={`${title}\n\n${productTitle}\n${descriptionWithComment}\nImagen: ${img}\n${shareUrl}`}
              >
                <RiTwitterXLine className='clickable shareProduct-media-btn text-2xl' />
              </TwitterShareButton>
              <EmailShareButton
                className='clickable shareProduct-icon-btn'
                url={`${title}\n\n${productTitle}\n${descriptionWithComment}\nImagen: ${img}\n${shareUrl}`}
              >
                <MdOutlineEmail className='clickable shareProduct-media-btn' />
              </EmailShareButton>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default ShareProductPopUp
