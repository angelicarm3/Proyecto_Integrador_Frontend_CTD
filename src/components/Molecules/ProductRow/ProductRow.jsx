import React from 'react'
import { BiSolidHide } from 'react-icons/bi'
import { FaEdit } from 'react-icons/fa'
import TashCan from '../../../assets/icons/eliminar.png'
import { setSelectedProduct } from '../../../context/slices/adminProductSlice'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

const ProductRow = ({ product, setShowConfirmDelete }) => {
  const dispatch = useDispatch()
  // const navigate = useNavigate()

  const handleHide = () => {
    // Lógica para eliminar el producto
  }

  const handleDelete = (id) => {
    dispatch(setSelectedProduct(product.id))
    setShowConfirmDelete(true)
    // dispatch(deleteProductThunk(product.id))
  }

  return (
    <tr>
      <td className='border px-4 py-2 text-center'>{product.id}</td>
      <td className='border px-4 py-2'>{product.marca} {product.modelo}</td>
      <td className='border px-4 py-2 text-center'>
        <div className='flex justify-center items-center gap-6'>
          <div>
            {
            product.categorias.map((category, index) => (
              <p key={index}>{category.nombre}</p>
            ))
          }
          </div>
          <Link
            className='text-gray3 text-lg'
            to={`/administracion/editar-producto/${product.id}`}
          >
            <FaEdit />
          </Link>
        </div>
      </td>
      <td className='border px-4 py-2 text-center'>{product.precioDia}</td>
      <td className='border px-4 py-2 text-center'>{product.matricula}</td>
      <td className='border px-4 py-2 w-1/4'>
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
            onClick={handleDelete}
          >
            <img src={TashCan} alt='Trashcan' className='w-5 h-5 max-w-none' />
          </button>
        </div>
      </td>
    </tr>
  )
}

export default ProductRow
