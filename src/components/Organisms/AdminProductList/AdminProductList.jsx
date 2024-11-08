import React from 'react'
import ProductRow from '../../Molecules/ProductRow/ProductRow'

const AdminProductsList = ({ products, setShowConfirmDelete, headers }) => {
  console.log(products)
  return (
    <table className='min-w-full border border-gray-300 '>
      <thead>
        <tr>
          {headers.map((header, index) => (
            <th key={index} className='border px-4 py-2 bg-customLighterBlue text-white font-normal'>
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <ProductRow key={product.id} product={product} setShowConfirmDelete={setShowConfirmDelete} />
        ))}
      </tbody>
    </table>
  )
}

export default AdminProductsList
