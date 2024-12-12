import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import CategoriesGrid from '../../Molecules/CategoriesGrid/CategoriesGrid'
import CategoriesGridMobile from '../../Molecules/CategoriesGrid/CategoriesGridMobile'
import './categories.css'

const Categories = () => {
  const { t } = useTranslation()
  const allCategories = useSelector((state) => state.category.allCategories)

  return (
    <section className='main-section mt-0 categories-section'>
      <p className='title'>{t('categories')}</p>
      <CategoriesGrid categories={allCategories} />
      <CategoriesGridMobile categories={allCategories} />
    </section>
  )
}

export default Categories
