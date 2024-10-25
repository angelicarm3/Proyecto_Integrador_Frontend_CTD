import { pageData } from '../../../data/page'
import CategoryBtn from '../../Atoms/CategoryBtn/CategoryBtn'

const Categories = () => {
  return (
    <div className='w-11/12 self-center my-6'>
      <p className='w-full font-semibold text-3xl text-white text-center mb-4'>{pageData.categories.title}</p>
      <div className='w-full h-fit flex justify-around'>
        {
          pageData.categories.buttons.map((category, index) => (
            <CategoryBtn key={index} category={category} />
          ))
        }
      </div>
    </div>
  )
}

export default Categories
