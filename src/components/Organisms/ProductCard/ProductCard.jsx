import { useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom'

import { FiShare2 } from 'react-icons/fi'
import { pageLabels } from '../../../data/pageLabels'
import FavBtn from '../../Atoms/FavBtn/FavBtn.jsx'
import ProductFeatures from '../../Molecules/ProductFeatures/ProductFeatures'
import ProductStars from '../../Molecules/ProductStars/ProductStars.jsx'
import ShareProductPopUp from '../../Templates/ShareProductPopUp/ShareProductPopUp.jsx'
import './productCard.css'

const ProductCard = ({ product, setShowRequireLoginPopup }) => {
  const navigate = useNavigate()
  const [mainImg, setMainImg] = useState()
  const [isShareModalOpen, setShareModalOpen] = useState(false)

  useEffect(() => {
    if (product) {
      setMainImg(product.imagenes.filter((img) => img.esPrincipal))
    }
  }, [product])

  const handleShareClick = () => {
    setShareModalOpen(true)
  }

  return (
    <div className='relative'>
      <div className='clickable product-card-container' onClick={() => navigate(`/producto/${product.id}`)}>
        <div className='product-info-container h-full'>
          {
            mainImg &&
              <img className='product-card-img' src={mainImg[0].url} alt='' />
          }
          <div className='h-full flex flex-col justify-between'>
            <p className='product-name'>{product.marca} {product.modelo}</p>
            <p className='product-daily-price'>
              ${product.precioDia}
              <span className='product-day-text'>{pageLabels.productCard.dia}</span>
            </p>
          </div>

          <ProductStars product={product} />
        </div>
        <div className='product-info-container h-fit'>
          <ProductFeatures product={product} type='product' />
          <div className='primary-btn rent-now-btn clickable'>Ver detalles
          </div>
        </div>
      </div>
      <div className='flex gap-3 absolute top-[250px] right-4'>
        <FavBtn product={product} setShowRequireLoginPopup={setShowRequireLoginPopup} />
        <FiShare2 className='text-yellow1 text-3xl hover:text-gray3 clickable' onClick={handleShareClick} />
      </div>
      {
        isShareModalOpen && (
          <ShareProductPopUp
            product={product}
            onClose={() => setShareModalOpen(false)}
          />
        )
      }
    </div>
  )
}

export default ProductCard
