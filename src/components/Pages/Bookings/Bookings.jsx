import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllBookinsThunk } from '../../../context/slices/bookinsSlice';

const Bookings = () => {
  const dispatch = useDispatch();
  const { bookins, loading, error } = useSelector((state) => state.bookins);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    dispatch(fetchAllBookinsThunk());
  }, [dispatch]);


  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedBookings = bookins.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(bookins.length / itemsPerPage);

  return (
    <div className="main-page mt-[68px] py-8 px-4 md:px-10">
      <h1 className="text-3xl md:text-4xl font-bold text-center text-yellow-500 mb-8">
        Mis Reservas
      </h1>

      {loading && (
        <p className="text-lg text-white-500 animate-pulse text-center">
          Cargando reservas...
        </p>
      )}
      {error && (
        <p className="text-lg text-red-600 text-center">
          Ocurrió un error: {error}
        </p>
      )}

      {!loading && !error && bookins.length === 0 && (
        <p className="text-lg text-white text-center">No hay reservas disponibles.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedBookings.map((booking) => (
          <div
            key={booking.id}
            className="booking-card bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition transform hover:scale-105"
          >
            <h2 className="text-lg font-semibold text-yellow-600 mb-3">
              Reserva ID: {booking.id}
            </h2>
            <p className="text-gray-700">
              <strong>Inicio:</strong> {booking.fechaInicio}
            </p>
            <p className="text-gray-700">
              <strong>Fin:</strong> {booking.fechaFin}
            </p>
            <p className="text-gray-700">
              <strong>Precio:</strong> ${booking.precioFinal}
            </p>
            <p className="text-gray-700">
              <strong>Comentario:</strong> {booking.comentario}
            </p>
            <p className="text-gray-700">
              <strong>Entrega:</strong> {booking.lugarEntrega}
            </p>
            <p className="text-gray-700">
              <strong>Recogida:</strong> {booking.lugarRecogida}
            </p>
            <p className="text-gray-700">
              <strong>Usuario:</strong> {booking.usuario.nombre} {booking.usuario.apellido}
            </p>
          </div>
        ))}
      </div>

      {bookins.length > itemsPerPage && (
        <div className="pagination flex justify-center items-center mt-8">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 mx-2 bg-yellow-500 text-white rounded-md disabled:opacity-50"
          >
            Anterior
          </button>
          <p className="text-white">
            Página {currentPage} de {totalPages}
          </p>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 mx-2 bg-yellow-500 text-white rounded-md disabled:opacity-50"
          >
            Siguiente
          </button>
        </div>
      )}
    </div>
  );
};

export default Bookings;
