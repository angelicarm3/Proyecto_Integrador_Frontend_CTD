import { Link } from 'react-router-dom'
import { FaEdit } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import { deleteProductThunk, fetchAllProductsAdminThunk, resetStatus, setSelectedProduct } from '../../../context/slices/adminProductSlice'
import EditBtn from '../../Atoms/EditBtn/EditBtn'
import DetailBtn from '../../Atoms/DetailBtn/DetailBtn'
import DeleteBtn from '../../Atoms/DeleteBtn/DeleteBtn'

const ProductRow = ({ product }) => {
  const dispatch = useDispatch()
  const token = localStorage.getItem('token')

  const resetTable = () => {
    window.scrollTo(0, 0)
    dispatch(resetStatus())
    dispatch(fetchAllProductsAdminThunk())
  }

  const handleSelectProduct = () => {
    dispatch(setSelectedProduct(product))
    withReactContent(Swal).fire({
      title: <p className='text-2xl font-semibold'>Detalles del Producto</p>,
      html: `
          <div class='w-fit flex flex-col text-left mx-auto'>
            <p><strong>Nombre:</strong> ${product.marca} ${product.modelo}</p>
            <p><strong>Matrícula:</strong> ${product.matricula}</p>
            <p><strong>Año de fabricación:</strong> ${product.fechaFabricacion}</p>
            <p><strong>Potencia:</strong> ${product.potenciaHP} HP</p>
            <p><strong>Velocidad:</strong> ${product.velocidad} km/h</p>
            <p><strong>Aceleración:</strong> ${product.aceleracion} s</p>
            <p><strong>Precio por día:</strong> $${product.precioDia}</p>
            <p><strong>Descripción:</strong> ${product.descripcion}</p>
          </div>
        `,
      confirmButtonText: 'Cerrar',
      customClass: {
        confirmButton: 'bg-blue1 text-white font-bold'
      }
    })
  }

  const handleDelete = () => {
    dispatch(setSelectedProduct(product))
    withReactContent(Swal).fire({
      title: <p className='text-2xl font-semibold'>¿Desea eliminar este producto?</p>,
      html: `
        <div class='w-fit flex flex-col items-center text-center mx-auto gap-2'>
            <p>${product.marca} ${product.modelo}</p>
            <p>${product.matricula}</p>
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
        dispatch(deleteProductThunk({ productId: product.id, token }))
          .unwrap()
          .then((response) => {
            withReactContent(Swal).fire({
              icon: 'success',
              text: 'Producto eliminado exitosamente',
              showConfirmButton: false,
              timer: 3000
            })
            resetTable()
          })
          .catch(() => {
            withReactContent(Swal).fire({
              icon: 'error',
              text: 'No se puede eliminar este producto',
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
      <td className='border px-4 py-2 text-center'>{product.id}</td>
      <td className='border px-4 py-2'>{product.marca} {product.modelo}</td>
      <td className='border px-4 py-2 text-center'>
        <div className='flex justify-center items-center gap-6'>
          <div>
            {
              product?.categorias?.map((category, index) => (
                <p key={index}>{category.nombre}</p>
              ))
            }
          </div>
          <Link
            className='text-gray3 text-lg'
            to={`/administracion/editar-producto/${product.id}`}
          >
            <FaEdit />
          </Link>
        </div>
      </td>
      <td className='border px-4 py-2 text-center'>{product.precioDia}</td>
      <td className='border px-4 py-2 text-center'>{product.matricula}</td>
      <td className='border px-4 py-2 w-1/4'>
        <div className='flex space-x-3 justify-center'>
          <EditBtn navigateTo={`/administracion/editar-producto/${product.id}`} />
          <DetailBtn onClickDetail={handleSelectProduct} />
          <DeleteBtn onClickDelete={handleDelete} />
        </div>
      </td>
    </tr>
  )
}

export default ProductRow
