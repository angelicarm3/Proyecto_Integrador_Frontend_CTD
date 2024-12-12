import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'

import { fetchAllCharacteristicsThunk, resetStatus } from '../../../context/slices/adminCharacteristicSlice'
import { changePage, filterData } from '../../../context/slices/paginatorSlice'
import AddBtn from '../../Atoms/AddBtn/AddBtn'
import BackBtn from '../../Atoms/BackBtn/BackBtn'
import Dropdown from '../../Atoms/DropDown/DropDown'
import CharacteristcsRow from '../../Molecules/CharacteristicsRow/CharacteristicsRow'
import LoaderComponent from '../../Molecules/Loader/LoaderComponent'
import Paginator from '../../Molecules/Paginator/Paginator'
import AdminTable from '../../Organisms/AdminTable/AdminTable'
import '../AdminProducts/AdminProducts.css'

const headers = ['id', 'labelName', 'icon', 'actions']

const AdminCharacteristics = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const { items } = useSelector((state) => state.paginator)
  const { loading, allCharacteristics, totalCharacteristics } = useSelector((state) => state.adminCharacteristic)

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

  return (
    <div className='admin-products-container'>
      <p className='title'>{t('administrateCharacteristics')}</p>
      <div>
        <section className='admin-products-section'>
          <div className='flex gap-3 h-full'>
            <BackBtn navigateTo='/administracion' />
            <AddBtn navigateTo='/administracion/agregar-caracteristica' />
          </div>

          <div className='admin-products-dropDown-conatiner'>
            <span>{t('results')}</span>
            <Dropdown allItems={allCharacteristics} />
          </div>
        </section>

        <AdminTable headers={headers}>
          {
            items?.map((characteristic) =>
              <CharacteristcsRow key={characteristic.id} characteristic={characteristic} />)
          }
        </AdminTable>
      </div>

      <Paginator totalItems={totalCharacteristics} onClick={onChangePage} />

      {
        loading &&
          <LoaderComponent />
      }
    </div>
  )
}

export default AdminCharacteristics
