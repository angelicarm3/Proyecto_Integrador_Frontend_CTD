import React from 'react'

const ProductRow = ({ product }) => {
  const handleDelete = () => {
    // Lógica para eliminar el producto
    console.log(`Eliminar producto ${product.id}`)
  }
  const handleAddProduct = () => {
    console.log(`Editar producto ${product.id}`)
  }

  const handleEdit = () => {
    console.log(`Editar producto ${product.id}`)
  }
  return (
    <tr>
      <td className='border px-4 py-2'>{product.id}</td>
      <td className='border px-4 py-2'>{product.name}</td>
      <td className='border px-4 py-2 w-1/3'>
        <div className='flex space-x-4'>
          <button
            className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200'
            onClick={handleAddProduct}
          >
            Agregar Producto
          </button>
          <button
            className='bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-200'
            onClick={handleEdit}
          >
            Editar Producto
          </button>
          <button
            className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-200'
            onClick={handleDelete}
          >
            Eliminar Producto
          </button>
        </div>
      </td>
    </tr>
  )
}

export default ProductRow
