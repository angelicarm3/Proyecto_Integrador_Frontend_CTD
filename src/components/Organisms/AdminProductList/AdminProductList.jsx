import React from 'react'
import ProductRow from '../../Molecules/ProductRow/ProductRow'
import { productsData } from '../../../data/products'

const AdminProductsList = ({ products, setShowConfirmDelete }) => {
  return (
    <table className='min-w-full border border-gray-300 '>
      <thead>
        <tr>
          <th className='border px-4 py-2 bg-customLighterBlue text-white font-normal'>Id</th>
          <th className='border px-4 py-2  bg-customLighterBlue text-white font-normal'>Nombre</th>
          {/* <th className='border px-4 py-2  bg-customLighterBlue text-white font-normal'>Categoria</th> */}
          <th className='border px-4 py-2  bg-customLighterBlue text-white font-normal'>Precio</th>
          <th className='border px-4 py-2  bg-customLighterBlue text-white font-normal'>Matrícula</th>
          <th className='border px-4 py-2  bg-customLighterBlue text-white font-normal'>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {products.map(product => (
          <ProductRow key={product.id} product={product} setShowConfirmDelete={setShowConfirmDelete} />
        ))}
      </tbody>
    </table>
  )
}

export default AdminProductsList
