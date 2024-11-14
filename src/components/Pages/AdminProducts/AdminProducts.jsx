import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { AiOutlineLoading } from 'react-icons/ai'

import './AdminProducts.css'
import { pageLabels } from '../../../data/pageLabels'
import { fetchAllProductsAdminThunk, deleteProductThunk, setItemsToShow, resetStatus, setPage } from '../../../context/slices/adminProductSlice'
import AdminSearchBar from '../../Organisms/AdminSearchBar/AdminSearchBar'
import SearchBtn from '../../Atoms/SearchBtn/SearchBtn'
import AdminProductList from '../../Organisms/AdminProductList/AdminProductList'
import Dropdown from '../../Atoms/DropDown/DropDown'
import Pagination from '../../Molecules/Pagination/Pagination'
import CancelBtn from '../../Atoms/CancelBtn/CancelBtn'
import AddBtn from '../../Atoms/AddBtn/AddBtn'
import ProductRow from '../../Molecules/ProductRow/ProductRow'
import LoaderComponent from '../../Molecules/Loader/LoaderComponent'
import BackBtn from '../../Atoms/BackBtn/BackBtn'

const AdminProducts = () => {
  const dispatch = useDispatch()

  const options = [10, 20, 30, 40, 50]
  const headers = ['Id', 'Nombre', 'Categoria', 'Precio', 'Matrícula', 'Acciones']

  const [showConfirmDelete, setShowConfirmDelete] = useState(false)
  const { selectedProduct, loading, success, allProducts, itemsToShow, currentPage } = useSelector((state) => state.adminProducts)
  // const { token } = useSelector((state) => state.loginRegister)
  const token = localStorage.getItem('token')

  const totalItems = allProducts.length
  const startIndex = (currentPage - 1) * itemsToShow
  const endIndex = startIndex + itemsToShow
  const currentProducts = allProducts.slice(startIndex, endIndex)

  useEffect(() => {
    window.scrollTo(0, 0)
    dispatch(resetStatus())
    dispatch(fetchAllProductsAdminThunk())
  }, [dispatch])

  useEffect(() => {
    if (success) {
      window.scrollTo(0, 0)
      const fetchData = async () => {
        await dispatch(resetStatus())
        dispatch(fetchAllProductsAdminThunk())
      }
      fetchData()
    }
  }, [success, dispatch])

  const handleSelect = (count) => {
    dispatch(setItemsToShow(count))
  }

  const handleClick = () => {
    setShowConfirmDelete(false)
  }

  const handleDeleteClick = (productId) => {
    dispatch(deleteProductThunk({ productId, token }))
    setShowConfirmDelete(false)
  }

  const handlePageChange = (page) => {
    dispatch(setPage(page))
  }

  return (
    <div className='admin-products-container'>
      <section className='admin-products-section'>
        <div className='primary-btn w-fit flex flex-col justify-center rounded-2xl bg-black1 px-3'>
          <BackBtn />
        </div>
        <AddBtn navigateTo='/administracion/agregar-producto' />

        <div className='admin-search-bar-container'>
          <AdminSearchBar productsList={allProducts} />
          <SearchBtn />
        </div>

        <div className='admin-products-dropDown-conatiner'>
          <span>Resultados</span>
          <Dropdown options={options} onSelect={handleSelect} />
        </div>
      </section>

      <AdminProductList headers={headers}>
        {currentProducts.map((product) =>
          <ProductRow key={product.id} product={product} setShowConfirmDelete={setShowConfirmDelete} />)}
      </AdminProductList>

      <div className='admin-products-pagination-conatiner'>
        <Pagination totalItems={totalItems} itemsToShow={itemsToShow} handlePageChange={handlePageChange} currentPage={currentPage} />
        <p className='admin-products-p'>{`Resultados ${startIndex + 1} a ${endIndex} de ${totalItems}`}</p>
      </div>

      {
        showConfirmDelete &&
          <div className='admin-products-confirm-delation-container pop-up-bg '>
            <div className='admin-products-confirm-delations-modal'>
              <p className='admin-products-confirm-delations-modal-p'>{pageLabels.adminProducts.confirmDelation}</p>
              <div className='btn-container'>
                <button
                  className='admin-products-confirm-delations-modal-btn'
                  type='button'
                  onClick={() => handleDeleteClick(selectedProduct.id)}
                >
                  <p>{pageLabels.adminProducts.delete}</p>
                </button>
                <CancelBtn handleClick={handleClick} />
              </div>
            </div>
          </div>
      }
      {
        loading &&
          <LoaderComponent />
      }
      {
        success &&
          <div className='admin-products-success pop-up-bg'>
            <div className='w-8/12 h-40 flex justify-center items-center bg-white border-2 border-gray1 rounded-lg'>
              <p className='text-xl text-green1'>¡Producto eliminado con éxito!</p>
            </div>
          </div>
      }
    </div>
  )
}

export default AdminProducts
