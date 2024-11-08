import { useSelector } from 'react-redux'

import './categories.css'
import { pageData } from '../../../data/page'
import CategoriesGrid from '../../Molecules/CategoriesGrid/CategoriesGrid'
import CategoriesGridMobile from '../../Molecules/CategoriesGrid/CategoriesGridMobile'

const Categories = () => {
  const allCategories = useSelector((state) => state.category.allCategories)

  return (
    <section className='main-section categories-section'>
      <p className='title'>{pageData.categories.title}</p>
      <CategoriesGrid categories={allCategories} />
      <CategoriesGridMobile categories={allCategories} />
    </section>
  )
}

export default Categories
