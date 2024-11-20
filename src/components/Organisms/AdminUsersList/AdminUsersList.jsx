import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllUsersAdminThunk, setPage, setItemsToShow } from '../../../context/slices/adminUserSlice';
import UserRow from '../../Molecules/UserRow/UserRow';

const AdminUsersList = () => {
  const dispatch = useDispatch();
  const { users, currentPage, itemsToShow, totalUsers = 0 } = useSelector((state) => state.adminUsers);
  const token = localStorage.getItem('token');

  // Obtener usuarios cuando el componente se monta
  useEffect(() => {
    if (token) {
      dispatch(fetchAllUsersAdminThunk(token));
    }
  }, [dispatch, token]);

  // Manejar el cambio de página
  const handlePageChange = (page) => {
    dispatch(setPage(page));
  };

  const handleItemsPerPageChange = (items) => {
    dispatch(setItemsToShow(items));
    dispatch(setPage(1)); // Resetear a la página 1 cuando cambia el número de elementos por página
  };

  // Calcular usuarios para mostrar en la página actual
  const indexOfLastUser = currentPage * itemsToShow;
  const indexOfFirstUser = indexOfLastUser - itemsToShow;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  // Calcular número total de páginas
  const totalPages = Math.ceil(totalUsers / itemsToShow);

  return (
    <div className='admin-users-list'>
      <table className='min-w-full table-auto border-collapse border border-gray-200'>
        <thead>
          <tr className='bg-gray-100'>
            <th className='border px-4 py-2'>ID</th>
            <th className='border px-4 py-2'>Nombre</th>
            <th className='border px-4 py-2'>Email</th>
            <th className='border px-4 py-2'>Rol</th>
            <th className='border px-4 py-2'>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user) => (
            <UserRow key={user.id} user={user} />
          ))}
        </tbody>
      </table>

      {/* Controles de Paginación */}
      <div className='flex items-center justify-center mt-4 space-x-2'>
        <span>Página</span>
        <button
          className={`px-3 py-1 rounded-md ${currentPage === 1 ? 'bg-yellow-500 text-black font-semibold' : 'bg-gray-200 text-gray-700'}`}
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
        >
          {currentPage}
        </button>
        {currentPage < totalPages && (
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            className='text-gray-700'
          >
            &gt;&gt;
          </button>
        )}
      </div>

      {/* Selección de elementos por página */}
      <div className='mt-4 flex items-center justify-center'>
        <label htmlFor='items-per-page' className='mr-2'>Items por página:</label>
        <select
          id='items-per-page'
          className='px-2 py-1 bg-white border rounded-md'
          onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
          value={itemsToShow}
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
      </div>
    </div>
  );
};

export default AdminUsersList;
