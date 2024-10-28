/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from 'react-redux'

import './categoryBtn.css'
import { getProductsByCategory } from '../../../context/slices/productSlice'

const CategoryBtn = ({ category }) => {
  const dispatch = useDispatch()
  const { img, text, filter } = category
  const selectedCategory = useSelector((state) => state.product.selectedCategory)

  return (
    <button className={`category-btn ${selectedCategory === filter && 'bg-gray3'}`} onClick={() => dispatch(getProductsByCategory(filter))}>
      <img src={img} alt={text} className='category-img' />
      <p className='category-text'>{text}</p>
    </button>
  )
}

export default CategoryBtn
