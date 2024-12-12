import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'

import { rearrangeImagesGrid } from '../../../context/slices/productSlice'
import './imagesGrid.css'

const ImagesGrid = () => {
  const location = useLocation()
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const { selectedProduct, mainImg, otherImg } = useSelector((state) => state.product)

  const clickChangeImg = (imgUrl) => {
    dispatch(rearrangeImagesGrid({ selectedProduct, imgUrl }))
  }

  return (
    <div className='images-grid-container'>
      <img className='main-img' src={mainImg[0]?.url} alt='' />
      <div className='secondary-grid'>
        {
          otherImg &&
          otherImg.map((imagen, index) => (
            window.innerWidth < 1024 && index < 3
              ? <img key={index} className='clickable other-img' src={imagen.url} alt='' onClick={() => clickChangeImg(imagen.url)} />
              : window.innerWidth >= 1024 && index < 4 && <img key={index} className='clickable other-img' src={imagen.url} alt='' onClick={() => clickChangeImg(imagen.url)} />
          ))
        }

        <Link className='see-more-btn' to={`/producto/${selectedProduct.id}/galeria`} state={{ previousLocation: location }}>
          {t('seeMore')}
        </Link>
      </div>
    </div>
  )
}

export default ImagesGrid
