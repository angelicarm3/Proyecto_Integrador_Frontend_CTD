import { useSelector } from 'react-redux'

import isoGold from '../../../assets/brand/isoGold.svg'
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

        {
          favorites?.length === 0 &&
            <div className='h-[300px] flex flex-col justify-center items-center text-gray3 text-lg'>
              <p>Aún no tienes autos favoritos</p>
              <img src={isoGold} alt='Logo de la marca' className='h-[150px] mt-6' />
            </div>
        }
      </div>
    </div>
  )
}

export default Favorites
