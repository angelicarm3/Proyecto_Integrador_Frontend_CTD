import React from 'react'
import { Link } from 'react-router-dom'

import { FaEdit } from 'react-icons/fa'
import TashCan from '../../../assets/icons/eliminar.png'
import { useDispatch } from 'react-redux'

import { deleteCharacteristicThunk, updateCharacteristicThunk } from '../../../context/slices/characteristicSlice'

const CharacteristcsRow = ({ product, setShowConfirmDelete }) => {
  const dispatch = useDispatch()

  const handleDelete = (id) => {
    console.log(`Eliminar producto ${id}`)
    dispatch(deleteCharacteristicThunk(id))
    setShowConfirmDelete(true)
  }

  const handleEditCategory = () => {
    // TODO obtenerlos del formulario
    const updatedData = {
      nombre: 'Nuevo Nombre',
      icono: 'https://nuevaurl.com/icono.png'
    }
    dispatch(updateCharacteristicThunk({ id: product.id, data: updatedData }))
      .then(() => console.log(`Producto ${product.id} actualizado exitosamente`))
      .catch((error) => console.error('Error al actualizar la característica:', error))
  }

  return (
    <tr className='border'>
      <td className='border-l border-r px-4 py-2 text-center'>{product.id}</td>
      <td className='border-l border-r px-4 py-2'>{product.nombre}</td>
      <td className='border-l border-r px-4 py-2 text-center'><img src={product.icono} width='20' /></td>
      <td className='border-l border-r px-4 py-2 w-1/4'>
        <div className='flex space-x-3 justify-center'>
          <Link
            className=' bg-yellow1 text-black px-4 py-2 rounded  text-lg'
            onClick={handleEditCategory}
            to={`/administracion/editar-caracteristica/${product.id}`}
          >
            <FaEdit />
          </Link>
          <div
            className='bg-red-500 text-white px-4 py-2 rounded'
            onClick={handleDelete}
          >
            <img src={TashCan} alt='Trashcan' className='w-5 h-5 max-w-none' />
          </div>
        </div>
      </td>
    </tr>
  )
}

export default CharacteristcsRow
