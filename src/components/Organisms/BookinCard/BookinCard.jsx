import React from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { deleteBookinThunk, setSelectedBookin } from '../../../context/slices/bookinsSlice';

const BookinCard = ({ booking, handleRefresh }) => {
  const { auto, fechaInicio, fechaFin, estado, id } = booking;
  const dispatch = useDispatch()
  const token = localStorage.getItem('token')

  const totalDays = Math.ceil((new Date(fechaFin) - new Date(fechaInicio)) / (1000 * 60 * 60 * 24));

  const formatDate = (date) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(date).toLocaleDateString('es-ES', options);
  };

  const handleDelete = () => {
    dispatch(setSelectedBookin(booking))
    withReactContent(Swal).fire({
      title: <p className="text-2xl font-semibold">¿Deseas eliminar esta reserva?</p>,
      html: `
        <div class="w-fit flex flex-col items-center text-center mx-auto gap-2">
          <p><strong>Auto:</strong> ${auto.marca} ${auto.modelo}</p>
          <p><strong>Fecha de inicio:</strong> ${formatDate(fechaInicio)}</p>
          <p><strong>Fecha de entrega:</strong> ${formatDate(fechaFin)}</p>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
      customClass: {
        confirmButton: 'bg-green-500 text-white font-bold',
        cancelButton: 'bg-red-500 text-white font-bold',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteBookinThunk({ id, token }))
          .then((response) => {
            if (response?.data) {
              
              withReactContent(Swal).fire({
                icon: 'success',
                text: 'Reserva eliminada exitosamente',
                showConfirmButton: false,
                timer: 3000,
              });
              handleRefresh();
            } else {
              
              withReactContent(Swal).fire({
                icon: 'error',
                text: 'No se puede eliminar esta reserva',
                showConfirmButton: false,
                timer: 3000,
              });
            }
          })
          .catch((err) => {
            
            console.error(err);
            withReactContent(Swal).fire({
              icon: 'error',
              text: 'No se puede eliminar esta reserva',
              showConfirmButton: false,
              timer: 3000,
            });
          });
      }
    });
  };
  
  
  

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer">
      
      <div className="text-sm text-gray-500 mb-2">ID: {id}</div>

      <img
        src={auto.imagenes[0]?.url || '/default-image.jpg'}
        alt={`${auto.marca} ${auto.modelo}`}
        className="w-full h-40 object-cover rounded-lg mb-4"
      />
      <div className="flex flex-col space-y-2">
        <h2 className="text-lg font-semibold">{auto.marca} {auto.modelo}</h2>
        <p><strong>Fecha de inicio:</strong> {formatDate(fechaInicio)}</p>
        <p><strong>Fecha de entrega:</strong> {formatDate(fechaFin)}</p>
        <p><strong>Total de días:</strong> {totalDays} {totalDays === 1 ? 'día' : 'días'}</p>
        <p><strong>Estado:</strong> {estado ? 'Activa' : 'Inactiva'}</p>
        
       
        <button
          onClick={handleDelete}
          className="mt-4 bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-600"
        >
          Eliminar Reserva
        </button>
      </div>
    </div>
  );
};

export default BookinCard;
