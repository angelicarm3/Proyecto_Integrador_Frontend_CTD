import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'

import './categories.css'
import { responsive } from '../../../data/responsive'
import { pageData } from '../../../data/page'
import CategoryBtn from '../../Atoms/CategoryBtn/CategoryBtn'

const CategoriesMobile = () => {
  return (
    <section className='main-section categories-section-container'>
      <p className='title'>{pageData.categories.title}</p>
      <div className='categories-mobile-container'>
        <Carousel
          responsive={responsive}
          showDots
        >
          {
          pageData.categories.buttons.map((category, index) => (
            <CategoryBtn key={index} category={category} />
          ))
        }
        </Carousel>
      </div>
    </section>
  )
}

export default CategoriesMobile
