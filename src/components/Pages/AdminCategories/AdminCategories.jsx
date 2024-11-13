import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setItemsToShow, setPage } from '../../../context/slices/adminProductSlice'
import { fetchAllCategoriesThunk, deleteCategoryThunk, registerCategoryThunk, reset } from '../../../context/slices/categorySlice'
import AdminProductList from '../../Organisms/AdminProductList/AdminProductList'
import Dropdown from '../../Atoms/DropDown/DropDown'
import Pagination from '../../Molecules/Pagination/Pagination'
import CancelBtn from '../../Atoms/CancelBtn/CancelBtn'
import AddBtn from '../../Atoms/AddBtn/AddBtn'
import { AiOutlineLoading } from 'react-icons/ai'
import { pageLabels } from '../../../data/pageLabels'
import CategoriesRow from '../../Molecules/CategoriesRow/CategoriesRow'

import './AdminCategories.css'

const AdminCategories = () => {
  const dispatch = useDispatch()

  const options = [10, 20, 30, 40, 50]
  const headers = ['Id', 'Titulo', 'Descripcion', 'Icono', 'Acciones']

  const [showConfirmDelete, setShowConfirmDelete] = useState(false)
  const { allCategories: categoriesList, loading, success } = useSelector((state) => state.category)
  const [newCategory, setNewCategory] = useState({ titulo: '', descripcion: '', icon: '' })

  useEffect(() => {
    window.scrollTo(0, 0)
    dispatch(fetchAllCategoriesThunk())
  }, [dispatch])

  useEffect(() => {
    if (success) {
      dispatch(fetchAllCategoriesThunk())
      setShowConfirmDelete(false)
      setTimeout(() => {
        dispatch(reset())
      }, 3000)
    }
  }, [success, dispatch])

  const handleAddCategory = () => {
    dispatch(registerCategoryThunk(newCategory))
    setNewCategory({ titulo: '', descripcion: '', icon: '' })
  }

  const itemsToShow = useSelector((state) => state.adminProducts.itemsToShow)
  const currentPage = useSelector((state) => state.adminProducts.currentPage)

  const handleClick = () => {
    setShowConfirmDelete(false)
  }
  const handleDeleteClick = (id) => {
    console.log(`Eliminar categoria ${id}`)
    dispatch(deleteCategoryThunk(id))
    setShowConfirmDelete(true)
  }

  const handleSelect = (count) => {
    dispatch(setItemsToShow(count))
    console.log(`Mostrar ${count} elementos`)
  }

  const handlePageChange = (page) => {
    dispatch(setPage(page))
  }

  const filteredCategories = categoriesList.slice(0, itemsToShow)
  console.log(filteredCategories)

  const totalItems = categoriesList.length
  const startIndex = (currentPage - 1) * itemsToShow
  const endIndex = startIndex + itemsToShow
  const currentCategories = categoriesList.slice(startIndex, endIndex)

  console.log(' currentCategories', currentCategories)

  return (
    <section className='admin-categories-container'>
      <div className='admin-categories-upper'>
        <div className='admin-search-bar-container'>
          <AddBtn navigateTo='/administracion/agregar-categoria' onClick={handleAddCategory} />
        </div>

        <div className='admin-categories-dropDown-container'>
          <span>{pageLabels.adminCategory.result}</span>
          <Dropdown options={options} onSelect={handleSelect} />
        </div>
      </div>

      <AdminProductList headers={headers}>
        {currentCategories.map((category) =>
          <CategoriesRow key={category.id} product={category} setShowConfirmDelete={setShowConfirmDelete} />
        )}
      </AdminProductList>

      <div className='admin-categories-pagination-container'>
        <Pagination totalItems={totalItems} itemsToShow={itemsToShow} handlePageChange={handlePageChange} currentPage={currentPage} />
        <p className='admin-categories-p'>{`Resultados ${startIndex + 1} a ${endIndex} de ${totalItems}`}</p>
      </div>

      {
        showConfirmDelete &&
        <div className='admin-categories-confirm-delation-container pop-up-bg '>
          <div className='admin-categories-confirm-delations-modal'>
            <p className='admin-categories-confirm-delations-modal-p'>{pageLabels.adminCategories.confirmDelation}</p>
            <div className='btn-container'>
              <button
                className='admin-categories-confirm-delations-modal-btn'
                type='button'
                onClick={() => handleDeleteClick()}
              >
                <p>{pageLabels.adminCategories.delete}</p>
              </button>
              <CancelBtn handleClick={handleClick} />
            </div>
          </div>
        </div>
      }
      {
        loading &&
        <div className='admin-categories-loading pop-up-bg'>
          <AiOutlineLoading size={40} className='loader-icon' />
        </div>
      }
      {
        success &&
        <div className='admin-categories-success pop-up-bg'>
          <div className='w-8/12 h-40 flex justify-center items-center bg-white border-2 border-gray1 rounded-lg'>
            <p className='text-xl text-green1'>¡Categoría eliminada con éxito!</p>
          </div>
        </div>
      }
    </section>
  )
}

export default AdminCategories
