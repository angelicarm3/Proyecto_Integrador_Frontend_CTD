import { useDispatch } from 'react-redux'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useTranslation } from 'react-i18next'

import { deleteCategoryThunk, fetchAllCategoriesThunk, resetStatus, setSelectedCategory } from '../../../context/slices/adminCategorySlice'
import DeleteBtn from '../../Atoms/DeleteBtn/DeleteBtn'
import DetailBtn from '../../Atoms/DetailBtn/DetailBtn'
import EditBtn from '../../Atoms/EditBtn/EditBtn'

const CategoriesRow = ({ category }) => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const token = localStorage.getItem('token')

  const resetTable = () => {
    window.scrollTo(0, 0)
    dispatch(resetStatus())
    dispatch(fetchAllCategoriesThunk())
  }

  const handleSelectCategory = () => {
    dispatch(setSelectedCategory(category))
    withReactContent(Swal).fire({
      title: <p className='text-2xl font-semibold'>{t('characteristicDetails')}</p>,
      html: `
        <div class='w-fit flex flex-col text-left mx-auto'>
          <p><strong>${t('labelName')}:</strong> ${category.nombre}</p>
          <p><strong>${t('titleDescription')}:</strong> ${category.descripcion}</p>
          <p class='flex gap-2'>
            <strong>${t('icon')}:</strong>
            <img src=${category.iconoCat} class='w-20' />
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
    dispatch(setSelectedCategory(category))
    withReactContent(Swal).fire({
      title: <p className='text-2xl font-semibold'>${t('doYouWishToDeteleteThisCategory')}</p>,
      html: `
        <div class='w-fit flex flex-col items-center text-center mx-auto gap-2'>
          <p>${category.nombre}</p>
          <img src=${category.iconoCat} class='w-20' />
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
        dispatch(deleteCategoryThunk({ id: category.id, token }))
          .unwrap()
          .then((response) => {
            withReactContent(Swal).fire({
              icon: 'success',
              text: `${t('categoryDeletedSuccessfully')}`,
              showConfirmButton: false,
              timer: 3000
            })
            resetTable()
          })
          .catch(() => {
            withReactContent(Swal).fire({
              icon: 'error',
              text: `${t('weCanNotDeleteThisCategory')}`,
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
      <td className='border px-4 py-2 text-center'>{category.id}</td>
      <td className='border px-4 py-2'>{category.nombre}</td>
      <td className='border px-4 py-2'>{category.descripcion}</td>
      <td className='border px-4 py-2'>
        <img src={category.iconoCat} className='w-12 mx-auto' />
      </td>
      <td className='border px-4 py-2 w-1/4'>
        <div className='flex space-x-3 justify-center'>
          <EditBtn navigateTo={`/administracion/editar-categoria/${category.id}`} />
          <DetailBtn onClickDetail={handleSelectCategory} />
          <DeleteBtn onClickDelete={handleDelete} />
        </div>
      </td>
    </tr>
  )
}

export default CategoriesRow
