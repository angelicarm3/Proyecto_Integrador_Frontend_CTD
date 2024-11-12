import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllUsersAdminThunk, setPage, setItemsToShow, resetStatus } from '../../../context/slices/adminUserSlice'
import UserRow from '../../Molecules/UserRow/UserRow'
import Paginator from '../../Molecules/Paginator/Paginator' // Import the Paginator component

const AdminUsersList = () => {
  const dispatch = useDispatch()
  const { users, loading, error, currentPage, itemsToShow, totalUsers, success } = useSelector((state) => state.adminUsers)
  const { token } = useSelector((state) => state.loginRegister)

  // Obtener usuarios cuando el componente se monta
  useEffect(() => {
    if (token) {
      dispatch(fetchAllUsersAdminThunk(token))
    }
  }, [dispatch, token])

  // Manejar la paginación
  const handlePageChange = (page) => {
    dispatch(setPage(page))
  }

  const handleItemsPerPageChange = (items) => {
    dispatch(setItemsToShow(items))
    dispatch(setPage(1)) // Reset to page 1 when items per page changes
  }

  // Calcular los usuarios a mostrar según la página y los elementos por página
  const indexOfLastUser = currentPage * itemsToShow
  const indexOfFirstUser = indexOfLastUser - itemsToShow
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser)

  return (
    <div className='admin-users-list'>
      <h1 className='text-2xl font-bold mb-4'>Panel de usuarios</h1>

      {loading && <p>Loading...</p>}
      {error && <p className='text-red-500'>{error}</p>}
      {success && <p className='text-green-500'>Éxito!</p>}

      <table className='min-w-full table-auto border-collapse border border-gray-200'>
        <thead>
          <tr className='bg-gray-100'>
            <th className='border px-4 py-2'>ID</th>
            <th className='border px-4 py-2'>Nombre</th>
            <th className='border px-4 py-2'>Email</th>
            <th className='border px-4 py-2'>Rol</th>
            <th className='border px-4 py-2'>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user) => (
            <UserRow key={user.id} user={user} />
          ))}
        </tbody>
      </table>

      {/* Paginación */}
      <Paginator onPageChange={handlePageChange} />

      {/* Selección de elementos por página */}
      <div className='mt-4'>
        <label htmlFor='items-per-page' className='mr-2'>Items por página:</label>
        <select
          id='items-per-page'
          className='px-2 py-1 bg-white border rounded-md'
          onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
          value={itemsToShow}
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
      </div>
    </div>
  )
}

export default AdminUsersList
