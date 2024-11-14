import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { modifiedAdminRole, deleteUserThunk, setSelectedUser, resetStatus, fetchAllUsersAdminThunk } from '../../../context/slices/adminUserSlice'
import { FaUserShield } from 'react-icons/fa'
import { HiTrash } from 'react-icons/hi'
import { BiSolidUserDetail } from 'react-icons/bi'

const UserRow = ({ user }) => {
  const dispatch = useDispatch()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false)
  // const { token } = useSelector((state) => state.loginRegister)
  const token = localStorage.getItem('token')
  const { selectedUser, users, loading, success } = useSelector((state) => state.adminUsers)

  const handleModifyAdmin = () => {
    dispatch(setSelectedUser(user))
    const { password, ...userDataWithoutPassword } = user
    dispatch(modifiedAdminRole({ userId: user.id, token, userData: { ...userDataWithoutPassword, esAdmin: !user.esAdmin } }))
  }

  const handleDeleteUser = () => {
    dispatch(deleteUserThunk({ userId: user.id, token, selectedUser }))
  }

  const handleSelectUser = () => {
    dispatch(setSelectedUser(user))
    setIsDetailsModalOpen(true)
  }

  const handleDeletUserClick = () => {
    dispatch(setSelectedUser(user))
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const handleCloseDetailsModal = () => {
    setIsDetailsModalOpen(false)
  }

  useEffect(() => {
    if (success) {
      setIsModalOpen(false)
      setIsSuccessModalOpen(true)
      setTimeout(() => {
        dispatch(resetStatus())
        dispatch(fetchAllUsersAdminThunk(token))
        setIsSuccessModalOpen(false)
      }
      , 3000)
    }
  }, [dispatch, success, token])

  return (
    <>
      <tr className='border-b hover:bg-gray-100'>
        <td className='px-4 py-2 text-center'>{user.id}</td>
        <td className='px-4 py-2 text-center'>{user.nombre} {user.apellido}</td>
        <td className='px-4 py-2 text-center'>{user.email}</td>
        <td className='px-4 py-2 text-center'>{user.esAdmin ? 'Administrador' : 'Usuario'}</td>
        <td className='border px-4 py-2 w-1/4'>
          <div className='flex space-x-3 justify-center'>
            {user.userName !== 'angie000@gmail.com' &&
              <button
                className={`${user.esAdmin ? 'bg-green1' : 'bg-blue1'} 'text-black px-4 py-2 rounded text-xl'`}
                onClick={() => handleModifyAdmin()}
              >
                <FaUserShield size={24} />
              </button>}
            <button
              className='bg-yellow1 px-4 py-2 rounded text-xl'
              onClick={handleSelectUser}
            >
              <BiSolidUserDetail size={24} />
            </button>
            {
              user.userName !== 'angie000@gmail.com' &&
                <button
                  className='bg-red1 px-4 py-2 rounded'
                  onClick={() => handleDeletUserClick()}
                  disabled={loading}
                >
                  <HiTrash size={24} />
                </button>
            }
          </div>
        </td>
      </tr>

      {/* Modal de confirmación */}
      {isModalOpen && (
        <div className='fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50'>
          <div className='bg-white p-6 rounded-lg shadow-lg max-w-sm w-full'>
            <h2 className='text-xl font-semibold mb-4'>Confirmar eliminación</h2>
            <p>¿Estás seguro de que deseas eliminar al usuario {user.nombre} {user.apellido}?</p>
            <div className='flex justify-between mt-4'>
              <button
                className='bg-gray-300 text-black px-4 py-2 rounded'
                onClick={handleCloseModal}
              >
                Cancelar
              </button>
              <button
                className='bg-red-600 text-white px-4 py-2 rounded'
                onClick={handleDeleteUser}
              >
                {loading ? 'Eliminando...' : 'Confirmar'}
              </button>
            </div>
          </div>
        </div>
      )}

      {isSuccessModalOpen && (
        <div className='fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50'>
          <div className='bg-white p-6 rounded-lg shadow-lg max-w-sm w-full'>
            <h2 className='text-xl font-semibold text-green-600 mb-4'>¡Eliminado con éxito!</h2>
            <p>El usuario {user.nombre} {user.apellido} ha sido eliminado correctamente.</p>
            <div className='mt-4 text-center'>
              <button
                className='bg-green-600 text-white px-4 py-2 rounded'
                onClick={() => setIsSuccessModalOpen(false)}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {isDetailsModalOpen && (
        <div className='fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50'>
          <div className='bg-white p-6 rounded-lg shadow-lg max-w-lg w-full'>
            <h2 className='text-xl font-semibold mb-4'>Detalles del Usuario</h2>
            <p><strong>Nombre:</strong> {user.nombre} {user.apellido}</p>
            <p><strong>DNI:</strong> {user.dni}</p>
            <p><strong>Edad:</strong> {user.edad}</p>
            <p><strong>Teléfono:</strong> {user.telefono}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Nacionalidad:</strong> {user.nacionalidad}</p>
            <p><strong>Usuario Administrador:</strong> {user.esAdmin ? 'Sí' : 'No'}</p>
            <p><strong>Estado:</strong> {user.estaActivo ? 'Activo' : 'Inactivo'}</p>
            <p><strong>Nombre de Usuario:</strong> {user.userName}</p>

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
    </>
  )
}

export default UserRow
