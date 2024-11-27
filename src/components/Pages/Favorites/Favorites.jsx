import { useSelector } from 'react-redux'

import ProductCard from '../../Organisms/ProductCard/ProductCard'

const Favorites = () => {
  const { favorites } = useSelector((state) => state.favorites)
  return (
    <div className='main-page mt-[68px] py-8'>
      <h1 className='title mt-3'>Mis Favoritos</h1>
      <div className='w-full md:max-w-[592px] flex flex-wrap justify-center gap-4'>
        {
          favorites &&
          favorites.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))
        }
      </div>
    </div>
  )
}

export default Favorites
