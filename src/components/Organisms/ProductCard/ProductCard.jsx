import { useNavigate } from 'react-router-dom'

import './productCard.css'
import { pageLabels } from '../../../data/pageLabels'
import RentNowBtn from '../../Atoms/RentNowBtn/RentNowBtn'
import ProductFeatures from '../../Molecules/ProductFeatures/ProductFeatures'
import FavBtn from '../../Atoms/FavBtn/FavBtn.jsx'
import NoFavBtn from '../../Atoms/FavBtn/NoFavBtn.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { addFav, removeFav } from '../../../context/slices/addFavs.js'


const ProductCard = ({ product }) => {
  const navigate = useNavigate()
  const mainImg = product.imagenes.filter((img) => img.esPrincipal)
  const dispatch = useDispatch()
  const { favorites } = useSelector((state) => state.favorites)

  const FavoritoEs = favorites.includes(product.id)

  const handleFav = () => {
    if (FavoritoEs) {
      dispatch(removeFav(product))
    } else {
      dispatch(addFav(product))
    }
  }
  
  const { loggedUser, isLoggedIn } = useSelector((state) => state.loginRegister)
  console.log("favoritos:" + favorites)
  
  return (
    <div className='relative'>
      <div className='product-card-container' onClick={() => navigate(`/producto/${product.id}`)}>
        <div className='product-info-container'>
          <img className='product-card-img' src={mainImg[0].url} alt='' />
          <p className='product-name'>{product.marca} {product.modelo}</p>
          <p className='product-daily-price'>
            ${product.precioDia}
            <span className='product-day-text'>{pageLabels.productCard.dia}</span>
          </p>
        </div>
        <div className='product-info-container'>
          <ProductFeatures product={product} type='product' />
          <RentNowBtn />
        </div>
      </div>
      {isLoggedIn ? 
        <button className='text-red-500 absolute top-5 right-5 ' onClick={handleFav}>
          {FavoritoEs ? <FavBtn /> : <NoFavBtn />}
        </button> :
        null
      }
    </div>
  )
}

export default ProductCard
