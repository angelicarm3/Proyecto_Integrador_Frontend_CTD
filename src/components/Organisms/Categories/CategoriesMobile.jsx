import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'

import './categories.css'
import { responsive } from '../../../data/responsive'
import { pageLabels } from '../../../data/pageLabels'
import CategoryBtn from '../../Atoms/CategoryBtn/CategoryBtn'

const CategoriesMobile = () => {
  return (
    <section className='main-section categories-section-container'>
      <p className='title'>{pageLabels.categories.title}</p>
      <div className='categories-mobile-container'>
        <Carousel
          responsive={responsive}
          showDots
        >
          {
          pageLabels.categories.buttons.map((category, index) => (
            <CategoryBtn key={index} category={category} />
          ))
        }
        </Carousel>
      </div>
    </section>
  )
}

export default CategoriesMobile
