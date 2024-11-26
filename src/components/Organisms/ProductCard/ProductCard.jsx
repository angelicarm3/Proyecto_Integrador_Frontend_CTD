import { useNavigate } from 'react-router-dom'

import './productCard.css'
import { pageLabels } from '../../../data/pageLabels'
import RentNowBtn from '../../Atoms/RentNowBtn/RentNowBtn'
import ProductFeatures from '../../Molecules/ProductFeatures/ProductFeatures'
import FavBtn from '../../Atoms/FavBtn/FavBtn.jsx'
import NoFavBtn from '../../Atoms/FavBtn/NoFavBtn.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { addFavoriteThunk, modifyFavs, removeFavoriteThunk } from '../../../context/slices/favoritesSlice.js'


const ProductCard = ({ product }) => {
  const navigate = useNavigate()
  const mainImg = product.imagenes.filter((img) => img.esPrincipal)
  const dispatch = useDispatch()
  const { favorites } = useSelector((state) => state.favorites)
  const token = localStorage.getItem('token')
  const isFavorite = favorites?.some((fav) => fav.id === product.id)

  const handleFav = () => {
    dispatch(modifyFavs(product))
    if (isFavorite) {
      dispatch(removeFavoriteThunk({userId: loggedUser.id, productId: product.id, token }))
    } else {
      dispatch(addFavoriteThunk({userId: loggedUser.id, productId: product.id, token }))
    }
  }
  
  const { loggedUser, isLoggedIn } = useSelector((state) => state.loginRegister)
  console.log(loggedUser)
  
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
          {isFavorite ? <FavBtn /> : <NoFavBtn />}
        </button> :
        null
      }
    </div>
  )
}

export default ProductCard
