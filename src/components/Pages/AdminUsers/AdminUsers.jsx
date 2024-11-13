import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllUsersAdminThunk } from '../.././../context/slices/adminUserSlice'
import AdminUsersList from '../../Organisms/AdminUsersList/AdminUsersList'
import Pagination from '../../Molecules/Pagination/Pagination'

const AdminUsers = () => {
  const dispatch = useDispatch()
  const { loading, error, success } = useSelector((state) => state.adminUsers)
  const { token } = useSelector((state) => state.loginRegister)

  
  useEffect(() => {
    if (token) {
      dispatch(fetchAllUsersAdminThunk(token))
    }
  }, [dispatch, token])

  return (
    <div className='admin-users-container p-4'>
      <h1 className='text-3xl font-semibold mb-6'>Admin Users</h1>

      
      {loading && <p className='text-gray-500'>Cargando Usuarios</p>}
      {error && <p className='text-red-500'>{error}</p>}
      {success && <p className='text-green-500'>Éxito!</p>}

  
      <AdminUsersList />
    </div>
  )
}

export default AdminUsers
