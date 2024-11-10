import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllUsersAdminThunk } from '../.././../context/slices/adminUserSlice';
import AdminUsersList from '../../Organisms/AdminUsersList/AdminUsersList';

const AdminUsers = () => {
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.adminUsers);

  // Obtener usuarios al montar el componente
  useEffect(() => {
    dispatch(fetchAllUsersAdminThunk());
  }, [dispatch]);

  return (
    <div className="admin-users-container p-4">
      <h1 className="text-3xl font-semibold mb-6">Admin Users</h1>

      {/* Mensajes de estado */}
      {loading && <p className="text-gray-500">Cargando Usuarios</p>}
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">Éxito!</p>}

      {/* Lista de usuarios */}
      <AdminUsersList />
    </div>
  );
};

export default AdminUsers;