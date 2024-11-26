import React from 'react'
import { useSelector } from 'react-redux'


const Favorites = () => {

    const { favorites } = useSelector((state) => state.favorites)
  return (
    <div className='size-10 w-[500px] h-[500px] bg-red-500 flex justify-center'>
        <div>
        {
            console.log(favorites.isFav)

        //   favorites.favProduct.map((product, index) => (
        //     <ProductCard key={index} product={product} />
        //   ))
        }
      </div>
    </div>
  )
}

export default Favorites
