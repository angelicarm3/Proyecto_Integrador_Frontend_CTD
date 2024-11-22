import './ShareProduct.css'
import ProductFeatures from '../../Molecules/ProductFeatures/ProductFeatures'

import React from 'react'
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa'

const ShareProduct = ({ product, onClose }) => {
  console.log(product)
  const image = product.imagenes[0].url
  return (
    <div className='fixed inset-0 bg-gray-50 bg-opacity-50 flex items-center justify-center min-h-screen'>
      <div className='bg-white rounded-lg shadow-lg w-full max-w-2xl sm:max-w-sm md:max-w-4xl lg:max-w-4xl xl:max-w-6xl p-6 relative mx-auto md:h-auto'>
        <button
          onClick={onClose}
          className='absolute top-4 right-4 bg-black text-white hover:text-gray-800 z-10 p-1 pl-3 pr-3 text-xl rounded-full font-bold'
        >
          ✕
        </button>
        <section className='flex flex-col md:flex-row sm:flex-col m-4'>
          <div className='flex w-full md:w-1/2 m-4 md:h-full lg:h-auto'>
            <img
              src={image}
              alt={product.modelo}
              className='rounded-md object-cover h-full w-full'
            />
          </div>

          <div className='flex flex-col w-full md:w-1/2 m-4'>
            <h2 className='text-lg font-bold mt-2 mb-4 text-black'>{product.marca} {product.modelo}</h2>
            <p className='text-xl font-bold text-gray-700 mb-4'>${product.precioDia}<span className='text-sm text-gray-400'>/day</span></p>
            <ProductFeatures className='text-gray-800 bg-gray-100' product={product} type='detail' />
            <p className='text-gray-600 text-sm mt-4'>{product.descripcion}</p>
            <textarea
              placeholder='Deja tu comentario'
              className='w-full mt-4 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
            />
            <div className='flex items-center mt-4'>
              <span className='mr-2 font-medium text-gray-600'>Compartir:</span>
              <button className='p-2 text-black hover:bg-blue-100 rounded-full'><FaFacebook size={20} /></button>
              <button className='p-2 text-black hover:bg-blue-100 rounded-full'><FaTwitter size={20} /></button>
              <button className='p-2 text-black hover:bg-pink-100 rounded-full'><FaInstagram size={20} /></button>
            </div>
          </div>

        </section>
      </div>
    </div>
  )
}

export default ShareProduct
