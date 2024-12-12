import { useDispatch } from 'react-redux'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useTranslation } from 'react-i18next'

import { deleteCharacteristicThunk, fetchAllCharacteristicsThunk, resetStatus, setSelectedCharacteristic } from '../../../context/slices/adminCharacteristicSlice'
import DeleteBtn from '../../Atoms/DeleteBtn/DeleteBtn'
import DetailBtn from '../../Atoms/DetailBtn/DetailBtn'
import EditBtn from '../../Atoms/EditBtn/EditBtn'

const CharacteristcsRow = ({ characteristic }) => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const token = localStorage.getItem('token')

  const resetTable = () => {
    window.scrollTo(0, 0)
    dispatch(resetStatus())
    dispatch(fetchAllCharacteristicsThunk())
  }

  const handleSelectCharacteristic = () => {
    dispatch(setSelectedCharacteristic(characteristic))
    withReactContent(Swal).fire({
      title: <p className='text-2xl font-semibold'>{t('characteristicDetails')}</p>,
      html: `
        <div class='w-fit flex flex-col text-left mx-auto'>
          <p><strong>${t('labelName')}:</strong> ${characteristic.nombre}</p>
          <p class='flex gap-2'>
            <strong>${t('icon')}:</strong>
            <img src=${characteristic.icono} class='w-12' />
          </p>
        </div>
        `,
      confirmButtonText: `${t('close')}`,
      customClass: {
        confirmButton: 'bg-blue1 text-white font-bold'
      }
    })
  }

  const handleDelete = () => {
    dispatch(setSelectedCharacteristic(characteristic))
    withReactContent(Swal).fire({
      title: <p className='text-2xl font-semibold'>${t('doYouWishToDeteleteThisCharacteristic')}</p>,
      html: `
        <div class='w-fit flex flex-col items-center text-center mx-auto gap-2'>
          <p>${characteristic.nombre}</p>
          <img src=${characteristic.icono} class='w-12' />
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
        dispatch(deleteCharacteristicThunk({ id: characteristic.id, token }))
          .unwrap()
          .then((response) => {
            withReactContent(Swal).fire({
              icon: 'success',
              text: `${t('characteristicDeletedSuccessfully')}`,
              showConfirmButton: false,
              timer: 3000
            })
            resetTable()
          })
          .catch(() => {
            withReactContent(Swal).fire({
              icon: 'error',
              text: `${t('weCanNotDeleteThisCharacteristic')}`,
              showConfirmButton: false,
              timer: 3000
            })
            resetTable()
          })
      }
    })
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
          <EditBtn navigateTo={`/administracion/editar-caracteristica/${characteristic.id}`} />
          <DetailBtn onClickDetail={handleSelectCharacteristic} />
          <DeleteBtn onClickDelete={handleDelete} />
        </div>
      </td>
    </tr>
  )
}

export default CharacteristcsRow
