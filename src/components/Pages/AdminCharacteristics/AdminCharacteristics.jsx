import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import './AdminCharacteristics.css'
import { pageLabels } from '../../../data/pageLabels'
import { fetchAllCharacteristicsThunk, deleteCharacteristicThunk, resetStatus, setItemsToShow, setPage } from '../../../context/slices/adminCharacteristicSlice'
import AdminProductList from '../../Organisms/AdminProductList/AdminProductList'
import Dropdown from '../../Atoms/DropDown/DropDown'
import Pagination from '../../Molecules/Pagination/Pagination'
import CancelBtn from '../../Atoms/CancelBtn/CancelBtn'
import AddBtn from '../../Atoms/AddBtn/AddBtn'
import CharacteristcsRow from '../../Molecules/CharacteristicsRow/CharacteristicsRow'
import LoaderComponent from '../../Molecules/Loader/LoaderComponent'
import BackBtn from '../../Atoms/BackBtn/BackBtn'

const AdminCharacteristics = () => {
  const dispatch = useDispatch()

  const options = [10, 20, 30, 40, 50]
  const headers = ['Id', 'Nombre', 'Icono', 'Acciones']

  const [showConfirmDelete, setShowConfirmDelete] = useState(false)
  const { selectedCharacteristic, loading, success, error, allCharacteristics, itemsToShow, currentPage } = useSelector((state) => state.adminCharacteristic)
  // const { token } = useSelector((state) => state.loginRegister)
  const token = localStorage.getItem('token')

  const totalItems = allCharacteristics.length
  const startIndex = (currentPage - 1) * itemsToShow
  const endIndex = startIndex + itemsToShow
  const currentCharacteristics = allCharacteristics.slice(startIndex, endIndex)

  useEffect(() => {
    window.scrollTo(0, 0)
    dispatch(resetStatus())
    dispatch(fetchAllCharacteristicsThunk())
  }, [dispatch])

  useEffect(() => {
    if (success) {
      window.scrollTo(0, 0)
      const fetchData = async () => {
        await dispatch(resetStatus())
        dispatch(fetchAllCharacteristicsThunk())
      }
      fetchData()
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

  const handleSelect = (count) => {
    dispatch(setItemsToShow(count))
  }

  const handleClick = () => {
    setShowConfirmDelete(false)
  }

  const handleDeleteClick = (id) => {
    dispatch(deleteCharacteristicThunk({ id, token }))
    setShowConfirmDelete(false)
  }

  const handlePageChange = (page) => {
    dispatch(setPage(page))
  }

  return (
    <section className='admin-characteristics-container'>
      <div className='admin-characteristics-upper'>
        <div className='primary-btn w-fit flex flex-col justify-center rounded-2xl bg-black1 px-3'>
          <BackBtn />
        </div>
        <div className='admin-search-bar-container'>
          <AddBtn navigateTo='/administracion/agregar-caracteristica' />
        </div>

        <div className='admin-products-dropDown-container'>
          <span>{pageLabels.adminCharacteristics.result}</span>
          <Dropdown options={options} onSelect={handleSelect} />
        </div>
      </div>

      <AdminProductList headers={headers}>
        {currentCharacteristics.map((characteristic) =>
          <CharacteristcsRow key={characteristic.id} characteristic={characteristic} setShowConfirmDelete={setShowConfirmDelete} />
        )}
      </AdminProductList>

      <div className='admin-products-pagination-container'>
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
                  onClick={() => handleDeleteClick(selectedCharacteristic.id)}
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
    </section>
  )
}

export default AdminCharacteristics
