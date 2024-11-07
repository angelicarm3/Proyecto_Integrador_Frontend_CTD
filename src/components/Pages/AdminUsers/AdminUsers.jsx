import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllUsersAdminThunk, deleteUserThunk, setItemsToShow, resetStatus, setPage } from '../../../context/slices/adminUserSlice'
import AdminSearchBar from '../../Organisms/AdminSearchBar/AdminSearchBar'
import SearchBtn from '../../Atoms/SearchBtn/SearchBtn'
import AdminUserList from '../../Organisms/AdminUserList/AdminUserList'
import Dropdown from '../../Atoms/DropDown/DropDown'
import Pagination from '../../Molecules/Pagination/Pagination'
import CancelBtn from '../../Atoms/CancelBtn/CancelBtn'
import { AiOutlineLoading } from 'react-icons/ai'
import './AdminUsers.css'

const AdminUsers = () => {
  const dispatch = useDispatch()

  const options = [10, 20, 30, 40, 50]
  const headers = ['Id', 'Nombre', 'Correo', 'Rol', 'Acciones']

  const [showConfirmDelete, setShowConfirmDelete] = useState(false)
  const { selectedUser, loading, error, success } = useSelector((state) => state.adminUsers)

  const usersList = useSelector((state) => state.adminUsers.users)
  const itemsToShow = useSelector((state) => state.adminUsers.itemsToShow)
  const currentPage = useSelector((state) => state.adminUsers.currentPage)

  useEffect(() => {
    window.scrollTo(0, 0)
    dispatch(fetchAllUsersAdminThunk())
  }, [dispatch])

  useEffect(() => {
    if (success) {
      window.scrollTo(0, 0)
      setTimeout(() => {
        dispatch(resetStatus())
      }, 3000)
    }
  }, [success, dispatch])

  const handleSelect = (count) => {
    dispatch(setItemsToShow(count))
    console.log(`Mostrar ${count} usuarios`)
  }

  const handleClick = () => {
    setShowConfirmDelete(false)
  }

  const handleDeleteClick = (userId) => {
    console.log(userId)
    dispatch(deleteUserThunk(userId))
    setShowConfirmDelete(false)
  }

  const handlePageChange = (page) => {
    dispatch(setPage(page))
  }

  const startIndex = (currentPage - 1) * itemsToShow
  const endIndex = startIndex + itemsToShow
  const currentUsers = usersList.slice(startIndex, endIndex)

  return (
    <div className='flex flex-col p-6 bg-gray-50 min-h-screen'>
    
      <section className='flex justify-between items-center mb-6'>
        <div className='flex items-center space-x-4'>
          <AdminSearchBar usersList={usersList} />
          <SearchBtn />
        </div>

        <div className='flex items-center space-x-3'>
          <span className='font-semibold text-gray-800'>Resultados</span>
          <Dropdown options={options} onSelect={handleSelect} />
        </div>
      </section>

      
      <AdminUserList users={currentUsers} setShowConfirmDelete={setShowConfirmDelete} headers={headers} />

      
      <div className='flex justify-between items-center mt-6'>
        <Pagination totalItems={usersList.length} itemsToShow={itemsToShow} handlePageChange={handlePageChange} currentPage={currentPage} />
        <p className='text-sm text-gray-600'>{`Resultados ${startIndex + 1} a ${endIndex} de ${usersList.length}`}</p>
      </div>

      
      {showConfirmDelete && (
        <div className='fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50'>
          <div className='bg-white p-6 rounded-lg shadow-lg w-80 text-center'>
            <p className='text-lg text-gray-800 font-medium mb-4'>¿Seguro que deseas eliminar este usuario?</p>
            <button
              onClick={() => handleDeleteClick(selectedUser.id)}
              className='bg-red-600 text-white py-2 px-4 rounded-lg w-full mb-3 hover:bg-red-700 transition duration-300'
            >
              Eliminar
            </button>
            <CancelBtn handleClick={handleClick} />
          </div>
        </div>
      )}

      {/* Cargando */}
      {loading && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'>
          <AiOutlineLoading size={40} className='text-white animate-spin' />
        </div>
      )}

      {/* Éxito */}
      {success && (
        <div className='fixed inset-0 bg-green-500 bg-opacity-50 flex justify-center items-center z-50'>
          <div className='bg-white p-6 rounded-lg shadow-lg text-center'>
            <p className='text-xl text-green-700 font-semibold'>¡Usuario eliminado con éxito!</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminUsers
