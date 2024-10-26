/* eslint-disable react/prop-types */
import './categoryBtn.css'

const CategoryBtn = ({ category }) => {
  const { img, text } = category

  return (
    <button className='category-btn'>
      <img src={img} alt={text} className='category-img' />
      <p className='category-text'>{text}</p>
    </button>
  )
}

export default CategoryBtn
