import { useSelector } from 'react-redux'

import './categories.css'
import { pageLabels } from '../../../data/pageLabels'
import CategoriesGrid from '../../Molecules/CategoriesGrid/CategoriesGrid'
import CategoriesGridMobile from '../../Molecules/CategoriesGrid/CategoriesGridMobile'

const Categories = () => {
  const allCategories = useSelector((state) => state.category.allCategories)

  return (
    <section className='main-section mt-0 categories-section'>
      <p className='title'>{pageLabels.categories.title}</p>
      <CategoriesGrid categories={allCategories} />
      <CategoriesGridMobile categories={allCategories} />
    </section>
  )
}

export default Categories
