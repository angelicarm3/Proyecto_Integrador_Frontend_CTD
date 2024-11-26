import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllUsersAdminThunk } from '../.././../context/slices/adminUserSlice'
import AdminUsersList from '../../Organisms/AdminUsersList/AdminUsersList'
import Pagination from '../../Molecules/Pagination/Pagination'
import LoaderComponent from '../../Molecules/Loader/LoaderComponent'
import BackBtn from '../../Atoms/BackBtn/BackBtn'

const AdminUsers = () => {
  const dispatch = useDispatch()
  const { loading } = useSelector((state) => state.adminUsers)
  // const { token } = useSelector((state) => state.loginRegister)
  const token = localStorage.getItem('token')

  useEffect(() => {
    if (token) {
      dispatch(fetchAllUsersAdminThunk(token))
    }
  }, [dispatch, token])

  return (
    <div className='admin-users-container p-4 mt-[68px]'>
      <div className='primary-btn w-fit flex flex-col justify-center rounded-2xl bg-black1 px-3 mb-6'>
        <BackBtn navigateTo='/administracion' />
      </div>
      <AdminUsersList />
      {
        loading &&
          <LoaderComponent />
      }
    </div>
  )
}

export default AdminUsers
