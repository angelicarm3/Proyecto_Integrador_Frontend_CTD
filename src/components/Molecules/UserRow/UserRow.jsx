import { useDispatch } from 'react-redux'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useTranslation } from 'react-i18next'

import { deleteUserThunk, fetchAllUsersAdminThunk, modifiedAdminRole, resetStatus, setSelectedUser } from '../../../context/slices/adminUserSlice'
import ChangeAdminBtn from '../../Atoms/ChangeAdminBtn/ChangeAdminBtn'
import DeleteBtn from '../../Atoms/DeleteBtn/DeleteBtn'
import DetailBtn from '../../Atoms/DetailBtn/DetailBtn'

const UserRow = ({ user }) => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const token = localStorage.getItem('token')

  const resetTable = () => {
    window.scrollTo(0, 0)
    dispatch(resetStatus())
    dispatch(fetchAllUsersAdminThunk(token))
  }

  const handleModifyAdmin = () => {
    dispatch(setSelectedUser(user))
    const { password, ...userDataWithoutPassword } = user
    dispatch(modifiedAdminRole({ userId: user.id, token, userData: { ...userDataWithoutPassword, esAdmin: !user.esAdmin } }))
      .unwrap()
      .then((response) => {
        withReactContent(Swal).fire({
          icon: 'success',
          text: `${t('userAdminModifiedSuccessfully')}`,
          showConfirmButton: false,
          timer: 3000
        })
        resetTable()
      })
      .catch(() => {
        withReactContent(Swal).fire({
          icon: 'error',
          text: `${t('weCanNotModifyThisUserAdmin')}`,
          showConfirmButton: false,
          timer: 3000
        })
        resetTable()
      })
  }

  const handleSelectUser = () => {
    dispatch(setSelectedUser(user))
    withReactContent(Swal).fire({
      title: <p className='text-2xl font-semibold'>{t('userDetails')}</p>,
      html: `
        <div class='w-fit flex flex-col text-left mx-auto'>
          <p><strong>${t('userName')}:</strong> ${user.userName}</p>
          <p><strong>${t('fullName')}:</strong> ${user.nombre} ${user.apellido}</p>
          <p><strong>${t('labelEmail')}:</strong> ${user.email}</p>
          <p><strong>${t('labelDni')}:</strong> ${user.dni}</p>
          <p><strong>${t('labelAge')}:</strong> ${user.edad}</p>
          <p><strong>${t('labelPhone')}:</strong> ${user.telefono}</p>
          <p><strong>${t('labelNacionality')}:</strong> ${user.nacionalidad}</p>
          <p><strong>${t('adminUser')}:</strong> ${user.esAdmin ? `${t('yes')}` : `${t('no')}`}</p></p>
        </div>
      `,
      confirmButtonText: `${t('close')}`,
      customClass: {
        confirmButton: 'bg-blue1 text-white font-bold'
      }
    })
  }

  const handleDelete = () => {
    dispatch(setSelectedUser(user))
    withReactContent(Swal).fire({
      title: <p className='text-2xl font-semibold'>{t('doYouWishToDeteleteThisUser')}</p>,
      html: `
        <div class='w-fit flex flex-col items-center text-center mx-auto gap-2'>
          <p><strong>${t('fullName')}:</strong> ${user.nombre} ${user.apellido}</p>
          <p><strong>${t('userName')}:</strong> ${user.userName}</p>
        </div>
        `,
      showCancelButton: true,
      confirmButtonText: `${t('delete')}`,
      cancelButtonText: `${t('cancel')}`,
      customClass: {
        confirmButton: 'bg-green1 text-white font-bold',
        cancelButton: 'bg-red1 text-white font-bold'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteUserThunk({ userId: user.id, token }))
          .unwrap()
          .then((response) => {
            withReactContent(Swal).fire({
              icon: 'success',
              text: `${t('userDeletedSuccessfully')}`,
              showConfirmButton: false,
              timer: 3000
            })
            resetTable()
          })
          .catch(() => {
            withReactContent(Swal).fire({
              icon: 'error',
              text: `${t('userDeletedSuccessfully')}`,
              showConfirmButton: false,
              timer: 3000
            })
            resetTable()
          })
      }
    })
  }

  return (
    <>
      <tr className='border-b hover:bg-gray-100'>
        <td className='px-4 py-2 text-center'>{user.id}</td>
        <td className='px-4 py-2 text-center'>{user.nombre} {user.apellido}</td>
        <td className='px-4 py-2 text-center'>{user.email}</td>
        <td className='px-4 py-2 text-center'>{user.esAdmin ? 'Administrador' : 'Usuario'}</td>
        <td className='border px-4 py-2 w-1/4'>
          <div className='flex space-x-3 justify-center'>
            {
              user.userName !== 'angie000@gmail.com' && user.userName !== localStorage.getItem('userName') &&
                <ChangeAdminBtn user={user} onClickChangeAdmin={handleModifyAdmin} />
            }
            <DetailBtn onClickDetail={handleSelectUser} />
            {
              user.userName !== 'angie000@gmail.com' &&
                <DeleteBtn onClickDelete={handleDelete} />
            }
          </div>
        </td>
      </tr>
    </>
  )
}

export default UserRow
