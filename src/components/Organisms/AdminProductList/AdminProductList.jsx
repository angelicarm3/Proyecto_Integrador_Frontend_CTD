import React from 'react'
import ProductRow from '../../Molecules/ProductRow/ProductRow'
import { productsData } from '../../../data/products'

const AdminProductsList = () => {
  return (
    <table className='min-w-full border border-gray-300 '>
      <thead>
        <tr>
          <th className='border px-4 py-2'>Id</th>
          <th className='border px-4 py-2'>Nombre</th>
          <th className='border px-4 py-2'>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {productsData.products.map(product => (
          <ProductRow key={product.id} product={product} />
        ))}
      </tbody>
    </table>
  )
}

export default AdminProductsList
