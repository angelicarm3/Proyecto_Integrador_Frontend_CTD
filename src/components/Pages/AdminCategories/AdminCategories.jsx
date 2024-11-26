import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import '../AdminProducts/AdminProducts.css'
import { fetchAllCategoriesThunk, resetStatus } from '../../../context/slices/adminCategorySlice'
import { changePage, filterData } from '../../../context/slices/paginatorSlice'
import BackBtn from '../../Atoms/BackBtn/BackBtn'
import AddBtn from '../../Atoms/AddBtn/AddBtn'
import Dropdown from '../../Atoms/DropDown/DropDown'
import AdminTable from '../../Organisms/AdminTable/AdminTable'
import CategoriesRow from '../../Molecules/CategoriesRow/CategoriesRow'
import Paginator from '../../Molecules/Paginator/Paginator'
import LoaderComponent from '../../Molecules/Loader/LoaderComponent'

const AdminCategories = () => {
  const dispatch = useDispatch()
  const headers = ['Id', 'Nombre', 'Descripción', 'Icono', 'Acciones']
  const { items } = useSelector((state) => state.paginator)
  const { loading, allCategories, totalCategories } = useSelector((state) => state.adminCategory)

  useEffect(() => {
    window.scrollTo(0, 0)
    dispatch(resetStatus())
    dispatch(fetchAllCategoriesThunk())
  }, [dispatch])

  useEffect(() => {
    dispatch(filterData(allCategories))
  }, [dispatch, allCategories])

  const onChangePage = (page) => {
    dispatch(changePage(page))
    dispatch(filterData(allCategories))
  }

  return (
    <div className='admin-products-container'>
      <div>
        <section className='admin-products-section'>
          <div className='flex gap-3 h-full'>
            <BackBtn navigateTo='/administracion' />
            <AddBtn navigateTo='/administracion/agregar-categoria' />
          </div>

          <div className='admin-products-dropDown-conatiner'>
            <span>Resultados</span>
            <Dropdown allItems={allCategories} />
          </div>
        </section>

        <AdminTable headers={headers}>
          {
            items?.map((category) =>
              category.nombre !== 'Todos' &&
                <CategoriesRow key={category.id} category={category} />)
          }
        </AdminTable>
      </div>

      <Paginator totalItems={totalCategories} onClick={onChangePage} />

      {
        loading &&
          <LoaderComponent />
      }
    </div>
  )
}

export default AdminCategories
