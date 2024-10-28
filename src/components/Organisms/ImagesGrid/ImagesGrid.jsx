/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'

import { Link, useLocation } from 'react-router-dom'

import './imagesGrid.css'
import { pageData } from '../../../data/page'

const ImagesGrid = ({ product }) => {
  const { id, imagenes } = product
  const location = useLocation()
  const [mainImg, setMainImg] = useState([])
  const [otherImg, setOtherImg] = useState([])

  const clickChangeImg = (imgId) => {
    setMainImg(imagenes.filter((img) => img.id === imgId))
    setOtherImg(imagenes.filter((img) => img.id !== imgId))
  }

  useEffect(() => {
    setMainImg(imagenes.filter((img) => img.es_principal))
    setOtherImg(imagenes.filter((img) => !img.es_principal))
  }, [imagenes])

  console.log(window.innerWidth)

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

        <Link className='see-more-btn' to={`/producto/${id}/galeria`} state={{ previousLocation: location }}>
          {pageData.productDetail.seeMore}
        </Link>
      </div>
    </div>
  )
}

export default ImagesGrid
