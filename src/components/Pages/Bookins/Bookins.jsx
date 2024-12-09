import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchBookinsByIdThunk } from '../../../context/slices/bookinsSlice'
import { changePage, filterData } from '../../../context/slices/paginatorSlice'
import Paginator from '../../Molecules/Paginator/Paginator'
import BookinCard from '../../Organisms/BookinCard/BookinCard'

const Bookins = () => {
  const dispatch = useDispatch()
  const token = localStorage.getItem('token')
  const { loggedUser } = useSelector((state) => state.loginRegister)
  const { bookinsByUser, loading, error } = useSelector((state) => state.bookins)
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

  if (loading) {
    return <p className="text-center text-lg">Cargando...</p>
  }

  if (error) {
    return <p className="text-center text-lg text-red-500">Error: {error}</p>
  }

  return (
    <div className="main-page mt-[68px] py-8">
      <h1 className="title mt-3">Mis reservas</h1>

     
      <div className="flex justify-center space-x-4 mb-6">
        <button
          className={`px-4 py-2 rounded ${
            currentTab === 'current' ? 'bg-yellow-400 text-black' : 'bg-gray-200'
          }`}
          onClick={() => setCurrentTab('current')}
        >
          Reservas actuales
        </button>
        <button
          className={`px-4 py-2 rounded ${
            currentTab === 'previous' ? 'bg-yellow-400 text-black' : 'bg-gray-200'
          }`}
          onClick={() => setCurrentTab('previous')}
        >
          Reservas anteriores
        </button>
      </div>

      {filteredBookins.length === 0 ? (
        <p className="text-center">No se encontraron reservas.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((booking) => (
              <BookinCard key={booking.id} booking={booking} />
            ))}
          </div>
          <Paginator totalItems={totalItems} onClick={onChangePage} />
        </>
      )}
    </div>
  )
}

export default Bookins
