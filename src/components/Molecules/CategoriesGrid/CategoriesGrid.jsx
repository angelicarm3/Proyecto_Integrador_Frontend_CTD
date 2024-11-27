import CategoryBtn from '../../Atoms/CategoryBtn/CategoryBtn'
import './categoriesGrid.css'

const CategoriesGrid = ({ categories }) => {
  return (
    <div className='categories-grid-container'>
      {
          categories?.map((category, index) => (
            <CategoryBtn key={index} category={category} />
          ))
        }
    </div>
  )
}

export default CategoriesGrid
