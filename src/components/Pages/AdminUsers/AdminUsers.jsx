import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllUsersAdminThunk } from '../.././../context/slices/adminUserSlice'
import AdminUsersList from '../../Organisms/AdminUsersList/AdminUsersList'
import Pagination from '../../Molecules/Pagination/Pagination'
import LoaderComponent from '../../Molecules/Loader/LoaderComponent'

const AdminUsers = () => {
  const dispatch = useDispatch()
  const { loading } = useSelector((state) => state.adminUsers)
  const { token } = useSelector((state) => state.loginRegister)

  useEffect(() => {
    if (token) {
      dispatch(fetchAllUsersAdminThunk(token))
    }
  }, [dispatch, token])

  return (
    <div className='admin-users-container p-4'>
      <h1 className='text-3xl font-semibold mb-6'>Admin Users</h1>
      <AdminUsersList />
      {
        loading &&
          <LoaderComponent />
      }
    </div>
  )
}

export default AdminUsers
