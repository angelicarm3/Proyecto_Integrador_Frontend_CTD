import React from 'react'
import { BiSolidHide } from "react-icons/bi"
import { FaEdit } from "react-icons/fa"
import TashCan from '../../../assets/icons/eliminar.png'

const ProductRow = ({ product }) => {
  const handleHide = () => {
    // Lógica para eliminar el producto
    console.log(`Ocultar producto ${product.id}`)
  }

  const handleDelete = () => {
    // Lógica para eliminar el producto
    console.log(`Eliminar producto ${product.id}`)
  }

  const handleEdit = () => {
    // Lógica para elditar el producto
    console.log(`Editar producto ${product.id}`)
  }
  return (
    <tr>
      <td className='border px-4 py-2 text-center'>{product.id}</td>
      <td className='border px-4 py-2'>{product.marca} {product.modelo}</td>
      <td className='border px-4 py-2 text-center'>{product.categorias[0]}</td>
      <td className='border px-4 py-2 text-center'>{product.precioDia}</td>
      <td className='border px-4 py-2 w-1/4'>
        <div className='flex space-x-3 justify-center'>
          <button
            className='bg-green-500  text-black px-4 py-2 rounded text-xl'
            onClick={handleEdit}
          >
            <BiSolidHide/>
          </button>
          <button
            className=' bg-yellow1 text-black px-4 py-2 rounded  text-lg'
            onClick={handleEdit}
          >
            <FaEdit/>
          </button>
          <button
            className='bg-red-500 text-white px-4 py-2 rounded'
            onClick={handleDelete}
          >
            <img src={TashCan} alt="Trashcan" className="w-5 h-5 max-w-none" />
          </button>
        </div>
      </td>
    </tr>
  )
}

export default ProductRow
