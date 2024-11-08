import { useDispatch, useSelector } from 'react-redux'

import './categoryBtn.css'
import { getProductsByCategory } from '../../../context/slices/productSlice'

const CategoryBtn = ({ category }) => {
  const dispatch = useDispatch()
  const { nombre, iconoCat } = category
  const selectedCategory = useSelector((state) => state.product.selectedCategory)

  return (
    <button className={`category-btn ${selectedCategory === nombre && 'bg-gray3'}`} onClick={() => dispatch(getProductsByCategory(nombre))}>
      <img src={iconoCat} alt={nombre} className='category-img' />
      <p className='category-text'>{nombre}</p>
    </button>
  )
}

export default CategoryBtn
