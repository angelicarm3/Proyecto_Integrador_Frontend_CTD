import React from 'react';
import { useDispatch } from 'react-redux';
import { assignAdminRole, removeAdminRole, deleteUserThunk, setSelectedUser } from '../../../context/slices/adminUserSlice';
import UserDetailsModal from '../UserDetailModal/UserDetailModal';

const UserRow = ({ user }) => {
  const dispatch = useDispatch();

  const handleAssignAdmin = () => {
    dispatch(assignAdminRole(user.id));
  };

  const handleRemoveAdmin = () => {
    dispatch(removeAdminRole(user.id));
  };

  const handleDeleteUser = () => {
    const confirmation = window.confirm(`¿Estas seguro que quieres eliminar al usuario ${user.nombre} ${user.apellido}?`);
    if (confirmation) {
      dispatch(deleteUserThunk(user.id));
    }
  };

  const handleSelectUser = () => {
    dispatch(setSelectedUser(user));
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <tr className="border-b hover:bg-gray-100">
      <td className="px-4 py-2 text-center">{user.id}</td>
      <td className="px-4 py-2 text-center">{user.nombre} {user.apellido}</td>
      <td className="px-4 py-2 text-center">{user.email}</td>
      <td className="px-4 py-2 text-center">{user.esAdmin ? "Administrador" : "Usuario"}</td>
      <td className="px-4 py-2 text-center">
        <div className="flex justify-center gap-2">
          {user.esAdmin ? (
            <button
              className="w-32 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-all duration-300"
              onClick={handleRemoveAdmin}
            >
              Quitar Admin
            </button>
          ) : (
            <button
              className="w-32 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all duration-300"
              onClick={handleAssignAdmin}
            >
              Asignar Admin
            </button>
          )}
          <button
            className="w-32 px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-all duration-300"
            onClick={handleSelectUser}
          >
            Ver detalles
          </button>
          <button
            className="w-32 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-all duration-300"
            onClick={handleDeleteUser}
          >
            Eliminar usuario
          </button>
        </div>
      </td>
    </tr>
  );
};

export default UserRow;
