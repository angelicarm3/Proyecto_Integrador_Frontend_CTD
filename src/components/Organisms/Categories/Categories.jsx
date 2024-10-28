import './categories.css'
import { pageData } from '../../../data/page'
import CategoryBtn from '../../Atoms/CategoryBtn/CategoryBtn'

const Categories = () => {
  return (
    <section className='main-section hidden md:block'>
      <p className='title'>{pageData.categories.title}</p>
      <div className='categories-container'>
        {
          pageData.categories.buttons.map((category, index) => (
            <CategoryBtn key={index} category={category} />
          ))
        }
      </div>
    </section>
  )
}

export default Categories
