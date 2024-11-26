import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { FaEdit } from 'react-icons/fa'
import { HiTrash } from 'react-icons/hi'
import { useDispatch } from 'react-redux'

import { setSelectedCharacteristic } from '../../../context/slices/adminCharacteristicSlice'
import { BiSolidDetail } from 'react-icons/bi'

const CharacteristcsRow = ({ characteristic, setShowConfirmDelete }) => {
  const dispatch = useDispatch()
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false)

  const handleSelectCharacteristic = () => {
    dispatch(setSelectedCharacteristic(characteristic))
    setIsDetailsModalOpen(true)
  }

  const handleDelete = (characteristic) => {
    dispatch(setSelectedCharacteristic(characteristic))
    setShowConfirmDelete(true)
  }

  const handleCloseDetailsModal = () => {
    setIsDetailsModalOpen(false)
  }

  return (
    <tr>
      <td className='border px-4 py-2 text-center'>{characteristic.id}</td>
      <td className='border px-4 py-2'>{characteristic.nombre}</td>
      <td className='border px-4 py-2'>
        <img src={characteristic.icono} className='w-8 mx-auto' />
      </td>
      <td className='border px-4 py-2 w-1/4'>
        <div className='flex space-x-3 justify-center'>
          <Link
            className=' bg-blue1 px-4 py-2 rounded text-lg'
            to={`/administracion/editar-caracteristica/${characteristic.id}`}
          >
            <FaEdit size={24} />
          </Link>
          <button
            className='bg-yellow1 px-4 py-2 rounded text-xl'
            onClick={handleSelectCharacteristic}
          >
            <BiSolidDetail size={24} />
          </button>
          <button
            className='bg-red1 px-4 py-2 rounded'
            onClick={() => handleDelete(characteristic)}
          >
            <HiTrash size={24} />
          </button>
        </div>
      </td>

      {isDetailsModalOpen && (
        <div className='fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50'>
          <div className='bg-white p-6 rounded-lg shadow-lg max-w-lg w-full'>
            <h2 className='text-xl font-semibold mb-4'>Detalles de la Característica</h2>
            <p><strong>Nombre:</strong> {characteristic.nombre}</p>
            <p className='flex gap-2'>
              <strong>Icono:</strong>
              <img src={characteristic.icono} className='w-8' />
            </p>

            <div className='mt-4 text-center'>
              <button
                className='bg-gray-300 text-black px-4 py-2 rounded'
                onClick={handleCloseDetailsModal}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </tr>
  )
}

export default CharacteristcsRow
