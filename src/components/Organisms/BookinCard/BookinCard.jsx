import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useTranslation } from 'react-i18next'

import { deleteBookinThunk, fetchBookinsByIdThunk, resetStatus, setSelectedBookin } from '../../../context/slices/bookinsSlice'

const BookinCard = ({ booking }) => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const token = localStorage.getItem('token')
  const { auto, fechaInicio, fechaFin, id, lugarEntrega, lugarRecogida } = booking
  const { loggedUser } = useSelector((state) => state.loginRegister)

  const totalDays = Math.ceil((new Date(fechaFin) - new Date(fechaInicio)) / (1000 * 60 * 60 * 24))

  const formatDate = (date) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' }
    return new Date(date).toLocaleDateString('es-ES', options)
  }

  const resetTable = () => {
    window.scrollTo(0, 0)
    setTimeout(() => {
      dispatch(resetStatus())
      dispatch(fetchBookinsByIdThunk({ userId: loggedUser.id, token }))
    }, '2000')
  }

  const handleDelete = () => {
    dispatch(setSelectedBookin(booking))
    withReactContent(Swal).fire({
      title: <p className='text-2xl font-semibold'>{t('doYouWishToDeteleteThisBookin')}</p>,
      html: `
        <div class="w-fit flex flex-col items-center text-center mx-auto gap-2">
          <p><strong>${t('car')}:</strong> ${auto.marca} ${auto.modelo}</p>
          <p><strong>${t('pickUpDate')}:</strong> ${formatDate(fechaInicio)}</p>
          <p><strong>${t('dropOffDate')}:</strong> ${formatDate(fechaFin)}</p>
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
        dispatch(deleteBookinThunk({ id, token }))
          .unwrap()
          .then((response) => {
            withReactContent(Swal).fire({
              icon: 'success',
              text: `${t('bookinDeletedSuccessfully')}`,
              showConfirmButton: false,
              timer: 3000
            })
            resetTable()
          })
          .catch(() => {
            withReactContent(Swal).fire({
              icon: 'error',
              text: `${t('weCanNotDeleteThisBookin')}`,
              showConfirmButton: false,
              timer: 3000
            })
            resetTable()
          })
      }
    })
  }

  return (
    <div className='text-gray6 p-4 rounded-lg'>

      <div className='text-sm text-gray3 mb-2'>{t('id')} {id}</div>

      <img
        src={auto.imagenes[0]?.url || '/default-image.jpg'}
        alt={`${auto.marca} ${auto.modelo}`}
        className='w-full h-40 object-cover rounded-lg mb-4'
      />
      <div className='flex flex-col space-y-2'>
        <h2 className='font-semibold text-xl text-yellow1'>{auto.marca} {auto.modelo}</h2>
        <p><strong>{t('pickUpDate')}:</strong> {formatDate(fechaInicio)}</p>
        <p><strong>{t('dropOffDate')}:</strong> {formatDate(fechaFin)}</p>
        <p><strong>{t('numberOfDays')}:</strong> {totalDays} {totalDays === 1 ? `${t('days')}` : `${t('day')}`}</p>
        <p><strong>{t('pickUpPlace')}:</strong> {lugarRecogida}</p>
        <p><strong>{t('dropOffPlace')}:</strong> {lugarEntrega}</p>

        <button
          onClick={handleDelete}
          className='mt-12 bg-red1 text-white font-bold py-2 px-4 rounded hover:opacity-75'
        >
          {t('cancelBookin')}
        </button>
      </div>
    </div>
  )
}

export default BookinCard
