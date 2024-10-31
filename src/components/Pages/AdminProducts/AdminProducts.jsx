import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { fetchAllProductsAdminThunk, deleteProductThunk, setItemsToShow, resetStatus, setPage } from '../../../context/slices/adminProductSlice'
import SearchBtn from '../../Atoms/SearchBtn/SearchBtn'
import AdminProductList from '../../Organisms/AdminProductList/AdminProductList'
import Dropdown from '../../Atoms/DropDown/DropDown'
import Pagination from '../../Molecules/Pagination/Pagination'
import CancelBtn from '../../Atoms/CancelBtn/CancelBtn'
import { AiOutlineLoading } from 'react-icons/ai'

const AdminProducts = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const options = [10, 20, 30, 40, 50]
  const [showConfirmDelete, setShowConfirmDelete] = useState(false)
  const { selectedProduct, loading, error, success } = useSelector((state) => state.adminProducts)
  console.log(success)

  useEffect(() => {
    window.scrollTo(0, 0)
    dispatch(fetchAllProductsAdminThunk())
  }, [dispatch])

  useEffect(() => {
    if (success) {
      window.scrollTo(0, 0)
      setTimeout(() => {
        dispatch(resetStatus())
      }, '3000')
    }
  }, [success, dispatch])

  const handleAddProduct = () => {
    console.log('Agregar producto')
    navigate('/administracion/agregar-producto')
  }

  const productsList = useSelector((state) => state.adminProducts.allProducts)
  const itemsToShow = useSelector((state) => state.adminProducts.itemsToShow)
  const currentPage = useSelector((state) => state.adminProducts.currentPage)

  const handleSelect = (count) => {
    dispatch(setItemsToShow(count))
    console.log(`Mostrar ${count} elementos`)
  }

  const handleClick = () => {
    setShowConfirmDelete(false)
  }

  const handleDeleteClick = (productId) => {
    console.log(productId)
    dispatch(deleteProductThunk(productId))
    setShowConfirmDelete(false)
  }

  const handlePageChange = (page) => {
    dispatch(setPage(page))
  }

  const filteredProducts = productsList.slice(0, itemsToShow)
  const totalItems = productsList.length
  const startIndex = (currentPage - 1) * itemsToShow
  const endIndex = startIndex + itemsToShow
  const currentProducts = productsList.slice(startIndex, endIndex)

  return (
    <div className='p-4 flex-column mt-[68px] relative'>
      <section className='flex items-center justify-around align-middle mb-4'>
        <button
          onClick={handleAddProduct}
          className='primary-btn  text-white px-4 py-2  h-8 rounded-2xl hover:bg-black1 transition duration-200'
        >
          + Añadir
        </button>
        <div className='flex w-3/5 gap-4'>
          <input
            type='text'
            placeholder='Palabra Clave'
            className='outline-none bg-transparent placeholder-gray-500 text-gray-700 border rounded-full px-4 py-2 flex-grow'
          />
          <SearchBtn />
        </div>

        <div className='flex items-center gap-2'>
          <span>Resultados</span>
          <Dropdown options={options} onSelect={handleSelect} />
        </div>
      </section>
      <AdminProductList products={currentProducts} setShowConfirmDelete={setShowConfirmDelete} />
      <div className='flex justify-between space-x-2'>
        <Pagination totalItems={totalItems} itemsPerPage={itemsToShow} onPageChange={handlePageChange} currentPage={currentPage} />
        <p className='text-gray-500'>{`Resultados ${startIndex + 1} a ${endIndex} de ${totalItems}`}</p>
      </div>
      {
        showConfirmDelete &&
          <div className='pop-up-bg w-screen h-screen absolute top-[-68px] left-0'>
            <div className='w-8/12 h-40 flex flex-col justify-center items-center bg-white border-2 border-gray1 rounded-lg'>
              <p className='text-xl text-black1'>¿Desea eliminar este producto?</p>
              <div className='btn-container' onClick={() => handleDeleteClick(selectedProduct.id)}>
                <button className='w-24 flex justify-center items-center bg-green1 text-base text-gray4 font-bold rounded-3xl hover:opacity-75 p-2' type='button'>
                  <p>Eliminar</p>
                </button>
                <CancelBtn handleClick={handleClick} />
              </div>
            </div>
          </div>
      }
      {
        loading &&
          <div className='pop-up-bg opacity-25 absolute w-screen h-screen absolute top-[-68px] left-0 rounded-lg'>
            <AiOutlineLoading size={40} className='loader-icon' />
          </div>
      }
      {
        success &&
          <div className='pop-up-bg w-screen h-screen absolute top-[-68px] left-0 absolute rounded-lg'>
            <div className='w-8/12 h-40 flex justify-center items-center bg-white border-2 border-gray1 rounded-lg'>
              <p className='text-xl text-green1'>¡Producto eliminado con éxito!</p>
            </div>
          </div>
      }
    </div>
  )
}

export default AdminProducts
