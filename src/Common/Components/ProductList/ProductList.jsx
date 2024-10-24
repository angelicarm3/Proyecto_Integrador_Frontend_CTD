import React from 'react'
import ProductRow from '../ProductRow/ProductRow'

const ProductList = () => {
  const products = [
    { id: 1, name: 'Producto 1' },
    { id: 2, name: 'Producto 2' },
    { id: 3, name: 'Producto 3' },
    { id: 4, name: 'Producto 4' }

  ]

  return (
    <table className='min-w-full border border-gray-300'>
      <thead>
        <tr>
          <th className='border px-4 py-2'>Id</th>
          <th className='border px-4 py-2'>Nombre</th>
          <th className='border px-4 py-2'>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {products.map(product => (
          <ProductRow key={product.id} product={product} />
        ))}
      </tbody>
    </table>
  )
}

export default ProductList
