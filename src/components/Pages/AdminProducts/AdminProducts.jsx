import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import './adminProducts.css'
import { pageLabels } from '../../../data/pageLabels'
import { fetchAllProductsAdminThunk, deleteProductThunk, resetStatus } from '../../../context/slices/adminProductSlice'
import { filterData, changePage } from '../../../context/slices/paginatorSlice'
import BackBtn from '../../Atoms/BackBtn/BackBtn'
import AddBtn from '../../Atoms/AddBtn/AddBtn'
import Dropdown from '../../Atoms/DropDown/DropDown'
import AdminTable from '../../Organisms/AdminTable/AdminTable'
import ProductRow from '../../Molecules/ProductRow/ProductRow'
import Paginator from '../../Molecules/Paginator/Paginator'
import CancelBtn from '../../Atoms/CancelBtn/CancelBtn'
import LoaderComponent from '../../Molecules/Loader/LoaderComponent'

const AdminProducts = () => {
  const dispatch = useDispatch()
  const token = localStorage.getItem('token')
  const headers = ['Id', 'Nombre', 'Categoria', 'Precio', 'Matrícula', 'Acciones']
  const { items } = useSelector((state) => state.paginator)
  const { selectedProduct, loading, success, allProducts, totalProducts } = useSelector((state) => state.adminProducts)
  const [showConfirmDelete, setShowConfirmDelete] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
    dispatch(resetStatus())
    dispatch(fetchAllProductsAdminThunk())
  }, [dispatch])

  useEffect(() => {
    dispatch(filterData(allProducts))
  }, [dispatch, allProducts])

  const onChangePage = (page) => {
    dispatch(changePage(page))
    dispatch(filterData(allProducts))
  }

  useEffect(() => {
    if (success) {
      window.scrollTo(0, 0)
      const fetchData = async () => {
        await dispatch(resetStatus())
        dispatch(fetchAllProductsAdminThunk())
      }
      setTimeout(() => {
        fetchData()
      }, 2000)
    }
  }, [success, dispatch])

  const handleCancelClick = () => {
    setShowConfirmDelete(false)
  }

  const handleDeleteClick = (productId) => {
    dispatch(deleteProductThunk({ productId, token }))
    setShowConfirmDelete(false)
  }

  return (
    <div className='admin-products-container'>
      <div>
        <section className='admin-products-section'>
          <div className='flex gap-3 h-full'>
            <BackBtn navigateTo='/administracion' />
            <AddBtn navigateTo='/administracion/agregar-producto' />
          </div>

          <div className='admin-products-dropDown-conatiner'>
            <span>Resultados</span>
            <Dropdown allItems={allProducts} />
          </div>
        </section>

        <AdminTable headers={headers}>
          {
            items?.map((product) =>
              <ProductRow key={product.id} product={product} setShowConfirmDelete={setShowConfirmDelete} />)
          }
        </AdminTable>
      </div>

      <Paginator totalItems={totalProducts} onClick={onChangePage} />

      {
        loading &&
          <LoaderComponent />
      }
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
                <CancelBtn handleClick={handleCancelClick} />
              </div>
            </div>
          </div>
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
