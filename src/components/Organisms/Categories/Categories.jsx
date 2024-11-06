import './categories.css'
import { pageLabels } from '../../../data/pageLabels'
import CategoryBtn from '../../Atoms/CategoryBtn/CategoryBtn'

const Categories = () => {
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
    </section>
  )
}

export default Categories
