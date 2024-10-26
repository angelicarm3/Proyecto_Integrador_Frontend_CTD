/* eslint-disable react/prop-types */
import './imagesGrid.css'
import { pageData } from '../../../data/page'

const ImagesGrid = ({ images }) => {
  const mainImg = images.filter((img) => img.es_principal)
  const otherImg = images.filter((img) => !img.es_principal)

  return (
    <div className='images-grid-container'>
      <img className='main-img' src={mainImg[0].img} alt='' />
      <div className='w-[100px] flex flex-col justify-between gap-3'>
        {
          otherImg.map((imagen, index) => (
            index < 4 &&
              <img key={index} className='other-img' src={imagen.img} alt='' />
          ))
        }
        <p>{pageData.productDetail.seeMore}</p>
      </div>
    </div>
  )
}

export default ImagesGrid
