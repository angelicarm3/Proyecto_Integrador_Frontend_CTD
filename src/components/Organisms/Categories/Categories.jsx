import { useSelector } from 'react-redux'

import './categories.css'
import { pageLabels } from '../../../data/pageLabels'
import CategoryBtn from '../../Atoms/CategoryBtn/CategoryBtn'
import CategoriesGrid from '../../Molecules/CategoriesGrid/CategoriesGrid'
import CategoriesGridMobile from '../../Molecules/CategoriesGrid/CategoriesGridMobile'

const Categories = () => {
  const allCategories = useSelector((state) => state.category.allCategories)

  return (
    <section className='main-section categories-section'>
      <p className='title'>{pageLabels.categories.title}</p>
      <div className='categories-container'>
        {
          pageLabels.categories.buttons.map((category, index) => (
            <CategoryBtn key={index} category={category} />
          ))
        }
      </div>
      <p className='title'>{pageData.categories.title}</p>
      <CategoriesGrid categories={allCategories} />
      <CategoriesGridMobile categories={allCategories} />
    </section>
  )
}

export default Categories
