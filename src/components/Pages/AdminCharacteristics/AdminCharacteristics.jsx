import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setItemsToShow, resetStatus, setPage } from '../../../context/slices/adminProductSlice'
import { fetchAllCharacteristicsThunk } from '../../../context/slices/characteristicSlice'

import AdminSearchBar from '../../Organisms/AdminSearchBar/AdminSearchBar'
import SearchBtn from '../../Atoms/SearchBtn/SearchBtn'
import AdminProductList from '../../Organisms/AdminProductList/AdminProductList'
import Dropdown from '../../Atoms/DropDown/DropDown'
import Pagination from '../../Molecules/Pagination/Pagination'
import CancelBtn from '../../Atoms/CancelBtn/CancelBtn'
import { AiOutlineLoading } from 'react-icons/ai'
import { pageLabels } from '../../../data/pageLabels'
import CharacteristcsRow from '../../Molecules/CharacteristicsRow/CharacteristicsRow'

const AdminCharacteristics = () => {
  const dispatch = useDispatch()

  const options = [10, 20, 30, 40, 50]
  const headers = ['Id', 'Nombre', 'Icono', 'Acciones']

  const [showConfirmDelete, setShowConfirmDelete] = useState(false)
  const { allCharacteristics: characteristicsList, loading, success } = useSelector((state) => state.characteristic)

  useEffect(() => {
    window.scrollTo(0, 0)
    dispatch(fetchAllCharacteristicsThunk())
  }, [dispatch])

  useEffect(() => {
    if (success) {
      window.scrollTo(0, 0)
      setTimeout(() => {
        dispatch(resetStatus())
      }, '3000')
    }
  }, [success, dispatch])
  console.log(success)

  const itemsToShow = useSelector((state) => state.adminProducts.itemsToShow)
  const currentPage = useSelector((state) => state.adminProducts.currentPage)

  const handleSelect = (count) => {
    dispatch(setItemsToShow(count))
    console.log(`Mostrar ${count} elementos`)
  }

  const handleClick = () => {
    setShowConfirmDelete(false)
  }

  const handleDeleteClick = (characteristcId) => {
    console.log(characteristcId)
    // dispatch(deleteProductThunk(characteristcId))
    setShowConfirmDelete(false)
  }

  const handlePageChange = (page) => {
    dispatch(setPage(page))
  }

  const filteredProducts = characteristicsList.slice(0, itemsToShow)
  console.log(filteredProducts)

  const totalItems = characteristicsList.length
  const startIndex = (currentPage - 1) * itemsToShow
  const endIndex = startIndex + itemsToShow
  const currentCharacteristics = characteristicsList.slice(startIndex, endIndex)

  console.log('characteristicsList', characteristicsList)
  console.log('currentCharacteristics', currentCharacteristics)
  return (
    <section className='admin-characteristics-container'>
      <div className='admin-search-bar-container'>
        <AdminSearchBar CharacteristicsList={characteristicsList} />
        <SearchBtn />
      </div>

      <div className='admin-products-dropDown-container'>
        <span>{pageLabels.adminCharacteristics.result}</span>
        <Dropdown options={options} onSelect={handleSelect} />
      </div>

      <AdminProductList headers={headers}>
        {currentCharacteristics.map((product) =>
          <CharacteristcsRow key={product.id} product={product} setShowConfirmDelete={setShowConfirmDelete} />
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
                  onClick={() => handleDeleteClick()}
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
          <div className='admin-products-loading pop-up-bg'>
            <AiOutlineLoading size={40} className='loader-icon' />
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
    </section>
  )
}

export default AdminCharacteristics
