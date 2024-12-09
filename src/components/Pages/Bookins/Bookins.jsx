import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchBookinsByIdThunk } from '../../../context/slices/bookinsSlice'

const Bookins = () => {
  const dispatch = useDispatch()
  const token = localStorage.getItem('token')
  const { loggedUser } = useSelector((state) => state.loginRegister)
  const { bookinsByUser, loading, error } = useSelector((state) => state.bookins)

  useEffect(() => {
    if (loggedUser && token) {
      
      dispatch(fetchBookinsByIdThunk({ userId: loggedUser.id, token }))
    }
  }, [dispatch, loggedUser, token])

  if (loading) {
    return <p className="text-center text-lg">Cargando...</p>
  }

  if (error) {
    return <p className="text-center text-lg text-red-500">Error: {error}</p>
  }

  return (
    <div className='main-page mt-[68px] py-8'>
      <h1 className='title mt-3'>Mis reservas</h1>
      {bookinsByUser.length === 0 ? (
        <p className="text-center">No se encontraron reservas.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {bookinsByUser.map((booking) => (
            <div key={booking.id} className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <img 
                src={booking.auto.imagenes[0]?.url || '/default-image.jpg'} 
                alt={`${booking.auto.marca} ${booking.auto.modelo}`} 
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <div className="flex flex-col space-y-2">
                <h2 className="text-lg font-semibold">{booking.auto.marca} {booking.auto.modelo}</h2>
                <p><strong>Fecha de inicio:</strong> {new Date(booking.fechaInicio).toLocaleDateString()}</p>
                <p><strong>Fecha de entrega:</strong> {new Date(booking.fechaFin).toLocaleDateString()}</p>
                <p><strong>Estado:</strong> {booking.estado}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Bookins
