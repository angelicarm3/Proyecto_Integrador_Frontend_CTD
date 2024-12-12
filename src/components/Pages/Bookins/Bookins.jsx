import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'

import isoGold from '../../../assets/brand/isoGold.svg'
import { fetchBookinsByIdThunk } from '../../../context/slices/bookinsSlice'
import { changePage, filterData } from '../../../context/slices/paginatorSlice'
import Paginator from '../../Molecules/Paginator/Paginator'
import BookinCard from '../../Organisms/BookinCard/BookinCard'

const Bookins = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const token = localStorage.getItem('token')
  const { loggedUser } = useSelector((state) => state.loginRegister)
  const { bookinsByUser, loading, totalBookinsByUser, error } = useSelector((state) => state.bookins)
  const { items, totalItems } = useSelector((state) => state.paginator)

  const [currentTab, setCurrentTab] = useState('current')
  const [filteredBookins, setFilteredBookins] = useState([])

  useEffect(() => {
    if (loggedUser && token) {
      dispatch(fetchBookinsByIdThunk({ userId: loggedUser.id, token }))
    }
  }, [dispatch, loggedUser, token])

  useEffect(() => {
    if (bookinsByUser) {
      const now = new Date()
      const filtered =
        currentTab === 'current'
          ? bookinsByUser.filter((booking) => new Date(booking.fechaFin) >= now)
          : bookinsByUser.filter((booking) => new Date(booking.fechaFin) < now)
      setFilteredBookins(filtered)
      dispatch(filterData(filtered))
    }
  }, [bookinsByUser, currentTab, dispatch])

  const onChangePage = (page) => {
    dispatch(changePage(page))
    dispatch(filterData(filteredBookins))
  }

  return (
    <div className='main-page mt-[68px] py-8'>
      <h1 className='title mt-3'>{t('myBookins')}</h1>

      <div className='flex justify-center space-x-4 mb-6'>
        <button
          className={`px-4 py-2 rounded font-bold ${
            currentTab === 'current' ? 'primary-btn ' : 'secondary-btn'
          }`}
          onClick={() => setCurrentTab('current')}
        >
          {t('currentBookins')}
        </button>
        <button
          className={`px-4 py-2 rounded font-bold ${
            currentTab === 'previous' ? 'primary-btn ' : 'secondary-btn'
          }`}
          onClick={() => setCurrentTab('previous')}
        >
          {t('previousBookins')}
        </button>
      </div>

      {filteredBookins.length === 0
        ? <div className='h-[300px] flex flex-col justify-center items-center text-gray3 text-lg'>
          <p>{t('youDoNotHaveBookinsYet')}</p>
          <img src={isoGold} alt='Logo de la marca' className='h-[150px] mt-6' />
        </div>
        : (
          <>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
              {items && items.map((booking) => (
                <BookinCard key={booking.id} booking={booking} />
              ))}
            </div>
            <Paginator totalItems={totalBookinsByUser} onClick={onChangePage} />
          </>
          )}
    </div>
  )
}

export default Bookins
