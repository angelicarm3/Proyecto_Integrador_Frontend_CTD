/* eslint-disable react/prop-types */
import { useEffect } from 'react'

import { Link, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import './imagesGrid.css'
import { pageData } from '../../../data/page'
import { arrangeImagesGrid, rearrangeImagesGrid } from '../../../context/slices/productSlice'

const ImagesGrid = ({ product }) => {
  const location = useLocation()
  const dispatch = useDispatch()
  const { selectedProduct, mainImg, otherImg } = useSelector((state) => state.product)

  useEffect(() => {
    dispatch(arrangeImagesGrid())
  }, [dispatch])

  const clickChangeImg = (imgId) => {
    dispatch(rearrangeImagesGrid(imgId))
  }

  return (
    <div className='images-grid-container'>
      <img className='main-img' src={mainImg[0]?.img} alt='' />
      <div className='secondary-grid'>
        {
          otherImg &&
          otherImg.map((imagen, index) => (
            window.innerWidth < 1024 && index < 3
              ? <img key={index} className='other-img' src={imagen.img} alt='' onClick={() => clickChangeImg(imagen.id)} />
              : window.innerWidth >= 1024 && index < 4 && <img key={index} className='other-img' src={imagen.img} alt='' onClick={() => clickChangeImg(imagen.id)} />
          ))
        }

        <Link className='see-more-btn' to={`/producto/${selectedProduct.id}/galeria`} state={{ previousLocation: location }}>
          {pageData.productDetail.seeMore}
        </Link>
      </div>
    </div>
  )
}

export default ImagesGrid
