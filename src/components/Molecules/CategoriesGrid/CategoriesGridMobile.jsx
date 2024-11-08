import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'

import './categoriesGrid.css'
import { responsive } from '../../../data/responsive'
import CategoryBtn from '../../Atoms/CategoryBtn/CategoryBtn'

const CategoriesGridMobile = ({ categories }) => {
  return (
    <div className='categories-grid-mobile-container'>
      <Carousel
        responsive={responsive}
        showDots
      >
        {
          categories?.map((category, index) => (
            <CategoryBtn key={index} category={category} />
          ))
        }
      </Carousel>
    </div>
  )
}

export default CategoriesGridMobile
