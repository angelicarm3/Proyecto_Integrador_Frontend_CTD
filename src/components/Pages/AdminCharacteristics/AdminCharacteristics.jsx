import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import '../AdminProducts/adminProducts.css'
import { pageLabels } from '../../../data/pageLabels'
import { fetchAllCharacteristicsThunk, deleteCharacteristicThunk, resetStatus } from '../../../context/slices/adminCharacteristicSlice'
import { changePage, filterData } from '../../../context/slices/paginatorSlice'
import BackBtn from '../../Atoms/BackBtn/BackBtn'
import AddBtn from '../../Atoms/AddBtn/AddBtn'
import Dropdown from '../../Atoms/DropDown/DropDown'
import AdminTable from '../../Organisms/AdminTable/AdminTable'
import CharacteristcsRow from '../../Molecules/CharacteristicsRow/CharacteristicsRow'
import Paginator from '../../Molecules/Paginator/Paginator'
import CancelBtn from '../../Atoms/CancelBtn/CancelBtn'
import LoaderComponent from '../../Molecules/Loader/LoaderComponent'

const AdminCharacteristics = () => {
  const dispatch = useDispatch()
  const token = localStorage.getItem('token')
  const headers = ['Id', 'Nombre', 'Icono', 'Acciones']
  const { items } = useSelector((state) => state.paginator)
  const { selectedCharacteristic, loading, success, error, allCharacteristics, totalCharacteristics } = useSelector((state) => state.adminCharacteristic)
  const [showConfirmDelete, setShowConfirmDelete] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
    dispatch(resetStatus())
    dispatch(fetchAllCharacteristicsThunk())
  }, [dispatch])

  useEffect(() => {
    dispatch(filterData(allCharacteristics))
  }, [dispatch, allCharacteristics])

  const onChangePage = (page) => {
    dispatch(changePage(page))
    dispatch(filterData(allCharacteristics))
  }

  useEffect(() => {
    if (success) {
      window.scrollTo(0, 0)
      const fetchData = async () => {
        await dispatch(resetStatus())
        dispatch(fetchAllCharacteristicsThunk())
      }
      setTimeout(() => {
        fetchData()
      }, 2000)
    }
  }, [success, dispatch])

  useEffect(() => {
    if (error) {
      window.scrollTo(0, 0)
      setTimeout(() => {
        dispatch(resetStatus())
      }, '2000')
    }
  }, [error, dispatch])

  const handleCancelClick = () => {
    setShowConfirmDelete(false)
  }

  const handleDeleteClick = (id) => {
    dispatch(deleteCharacteristicThunk({ id, token }))
    setShowConfirmDelete(false)
  }

  return (
    <div className='admin-products-container'>
      <div>
        <section className='admin-products-section'>
          <div className='flex gap-3 h-full'>
            <BackBtn navigateTo='/administracion' />
            <AddBtn navigateTo='/administracion/agregar-caracteristica' />
          </div>

          <div className='admin-products-dropDown-conatiner'>
            <span>Resultados</span>
            <Dropdown allItems={allCharacteristics} />
          </div>
        </section>

        <AdminTable headers={headers}>
          {
            items?.map((characteristic) =>
              <CharacteristcsRow key={characteristic.id} characteristic={characteristic} setShowConfirmDelete={setShowConfirmDelete} />)
          }
        </AdminTable>
      </div>

      <Paginator totalItems={totalCharacteristics} onClick={onChangePage} />

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
                  onClick={() => handleDeleteClick(selectedCharacteristic.id)}
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
              <p className='text-xl text-green1'>¡Característica eliminada con éxito!</p>
            </div>
          </div>
      }
      {
        error && error.includes('en uso') &&
          <div className='admin-products-success pop-up-bg'>
            <div className='w-8/12 h-40 flex justify-center items-center bg-white border-2 border-gray1 rounded-lg'>
              <p className='text-xl text-center text-red1 px-6'>No se puede eliminar esta característica pues está asignada a, al menos, un vehiculo</p>
            </div>
          </div>
      }
    </div>
  )
}

export default AdminCharacteristics
