import { useDispatch } from 'react-redux'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import { deleteCategoryThunk, fetchAllCategoriesThunk, resetStatus, setSelectedCategory } from '../../../context/slices/adminCategorySlice'
import EditBtn from '../../Atoms/EditBtn/EditBtn'
import DetailBtn from '../../Atoms/DetailBtn/DetailBtn'
import DeleteBtn from '../../Atoms/DeleteBtn/DeleteBtn'

const CategoriesRow = ({ category }) => {
  const dispatch = useDispatch()
  const token = localStorage.getItem('token')

  const resetTable = () => {
    window.scrollTo(0, 0)
    dispatch(resetStatus())
    dispatch(fetchAllCategoriesThunk())
  }

  const handleSelectCategory = () => {
    dispatch(setSelectedCategory(category))
    withReactContent(Swal).fire({
      title: <p className='text-2xl font-semibold'>Detalles de la Categoría</p>,
      html: `
        <div class='w-fit flex flex-col text-left mx-auto'>
          <p><strong>Nombre:</strong> ${category.nombre}</p>
          <p><strong>Descripción:</strong> ${category.descripcion}</p>
          <p class='flex gap-2'>
            <strong>Icono:</strong>
            <img src=${category.iconoCat} class='w-20' />
          </p>
        </div>
        `,
      confirmButtonText: 'Cerrar',
      customClass: {
        confirmButton: 'bg-blue1 text-white font-bold'
      }
    })
  }

  const handleDelete = () => {
    dispatch(setSelectedCategory(category))
    withReactContent(Swal).fire({
      title: <p className='text-2xl font-semibold'>¿Desea eliminar esta categoría?</p>,
      html: `
        <div class='w-fit flex flex-col items-center text-center mx-auto gap-2'>
          <p>${category.nombre}</p>
          <img src=${category.iconoCat} class='w-20' />
        </div>
        `,
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
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
              text: 'Categoría eliminada exitosamente',
              showConfirmButton: false,
              timer: 3000
            })
            resetTable()
          })
          .catch(() => {
            withReactContent(Swal).fire({
              icon: 'error',
              text: 'No se puede eliminar esta categoría pues está asignada a algún vehiculo',
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
