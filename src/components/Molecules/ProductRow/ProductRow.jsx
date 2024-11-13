import React from 'react'
import { BiSolidHide } from 'react-icons/bi'
import { FaEdit } from 'react-icons/fa'
import TashCan from '../../../assets/icons/eliminar.png'
import { setSelectedProduct } from '../../../context/slices/adminProductSlice'
import { useDispatch } from 'react-redux'

import { useNavigate } from 'react-router-dom'

const ProductRow = ({ product, setShowConfirmDelete }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleHide = () => {
    // Lógica para eliminar el producto
  }

  const handleDelete = (product) => {
    dispatch(setSelectedProduct(product))
    setShowConfirmDelete(true)
  }

  const handleEditCategory = () => {
    console.log('Editar producto', product.id)
    navigate(`/administracion/productos/editar/${product.id}`)
  }

  return (
    <tr className='border'>
      <td className='border-l border-r px-4 py-2 text-center'>{product.id}</td>
      <td className='border-l border-r px-4 py-2'>{product.marca} {product.modelo}</td>
      <td className='border-l border-r px-4 py-2 text-center flex flex-col'>
        <div className='self-end'>
          <FaEdit className='text-gray-500' onClick={() => { handleEditCategory(product.id) }} />
        </div>
        {product.categorias.map((categorie) => (
          <span key={categorie.id}>{categorie.nombre}</span>
        ))}
      </td>
      <td className='border-l border-r px-4 py-2 text-center'>{product.precioDia}</td>
      <td className='border-l border-r px-4 py-2 text-center'>{product.matricula}</td>
      <td className='border-l border-r px-4 py-2 w-1/4'>

        <div className='flex space-x-3 justify-center'>
          <button
            className='bg-green-500  text-black px-4 py-2 rounded text-xl'
            onClick={handleHide}
          >
            <BiSolidHide />
          </button>
          <Link
            className=' bg-yellow1 text-black px-4 py-2 rounded  text-lg'
            to={`/administracion/editar-producto/${product.id}`}
          >
            <FaEdit />
          </Link>
          <button
            className='bg-red-500 text-white px-4 py-2 rounded'
            onClick={() => handleDelete(product)}
          >
            <img src={TashCan} alt='Trashcan' className='w-5 h-5 max-w-none' />
          </button>
        </div>
      </td>
    </tr>
  )
}

export default ProductRow
