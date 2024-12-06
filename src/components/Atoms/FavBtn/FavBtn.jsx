import { useEffect, useState } from 'react'

import { MdFavoriteBorder, MdOutlineFavorite } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'

import { useLocation } from 'react-router-dom'
import { addFavoriteThunk, removeFavoriteThunk } from '../../../context/slices/favoritesSlice'

const FavBtn = ({ product, setShowRequireLoginPopup }) => {
  const dispatch = useDispatch()
  const token = localStorage.getItem('token')
  const { favorites } = useSelector((state) => state.favorites)
  const { loggedUser } = useSelector((state) => state.loginRegister)
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    if (favorites) {
      const favorite = favorites.some((fav) => fav.id === product.id)
      setIsFavorite(favorite)
    }
  }, [favorites, product.id])

  const handleToggleFavorite = () => {
    if (token) {
      setIsFavorite(!isFavorite)
      if (isFavorite) {
        dispatch(removeFavoriteThunk({ userId: loggedUser.id, productId: product.id, token }))
      } else {
        dispatch(addFavoriteThunk({ userId: loggedUser.id, productId: product.id, token }))
      }
    } else {
      setShowRequireLoginPopup(true)
    }
  }

  return (
    <button
      onClick={handleToggleFavorite}
      className='text-3xl text-red1 cursor-pointer hover:text-gray3'
    >
      {
        isFavorite
          ? <MdOutlineFavorite />
          : <MdFavoriteBorder />
      }
    </button>
  )
}

export default FavBtn
