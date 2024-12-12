import { useDispatch, useSelector } from 'react-redux'

import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { getProductsByCategory } from '../../../context/slices/productSlice'
import { translateText } from '../../../service/translateText'
import './categoryBtn.css'

const CategoryBtn = ({ category }) => {
  const dispatch = useDispatch()
  const { i18n } = useTranslation()
  const { nombre, iconoCat } = category
  const selectedCategory = useSelector((state) => state.product.selectedCategory)

  const [categoryName, setCategoryName] = useState()

  useEffect(() => {
    const fetchTranslation = async () => {
      const translatedDescription = await translateText(nombre)
      setCategoryName(translatedDescription)
    }

    if (category) {
      fetchTranslation()
    }
  }, [category])
  console.log(categoryName)

  return (
    <button className={`category-btn ${selectedCategory === nombre && 'bg-gray3'}`} onClick={() => dispatch(getProductsByCategory(nombre))}>
      <img src={iconoCat} alt={nombre} className='category-img' />
      {
        i18n.language === 'en'
          ? <p className='category-text'>{categoryName}</p>
          : <p className='category-text'>{nombre}</p>
      }

    </button>
  )
}

export default CategoryBtn
