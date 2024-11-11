import React from 'react';
import { useDispatch } from 'react-redux';
import { assignAdminRole, removeAdminRole, deleteUserThunk, setSelectedUser } from '../../../context/slices/adminUserSlice';

const UserRow = ({ user }) => {
  const dispatch = useDispatch();

  // Asigna el rol de administrador
  const handleAssignAdmin = () => {
    dispatch(assignAdminRole(user.id));
  };

  // Quita el rol de administrador
  const handleRemoveAdmin = () => {
    dispatch(removeAdminRole(user.id));
  };

  // Elimina el usuario
  const handleDeleteUser = () => {
    const confirmation = window.confirm(`Are you sure you want to delete user ${user.nombre}?`);
    if (confirmation) {
      dispatch(deleteUserThunk(user.id));
    }
  };

  // Selecciona un usuario para mostrar más detalles
  const handleSelectUser = () => {
    dispatch(setSelectedUser(user));
  };

  return (
    <tr className="border-b hover:bg-gray-100">
      <td className="px-4 py-2 text-center">{user.id}</td>
      <td className="px-4 py-2 text-center">{user.nombre} {user.apellido}</td>
      <td className="px-4 py-2 text-center">{user.email}</td>
      <td className="px-4 py-2 text-center">{user.esAdmin ? "Administrador" : "Usuario"}</td>
      <td className="px-4 py-2 text-center">
        {user.esAdmin === 'true' ? (
          <button
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-all duration-300"
            onClick={handleRemoveAdmin}
          >
            Quitar Admin
          </button>
        ) : (
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all duration-300"
            onClick={handleAssignAdmin}
          >
            Asignar administrador
          </button>
        )}
      </td>
      <td className="px-4 py-2 text-center">
        <button
          className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-all duration-300"
          onClick={handleSelectUser}
        >
          Ver detalles
        </button>
      </td>
      <td className="px-4 py-2 text-center">
        <button
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-all duration-300"
          onClick={handleDeleteUser}
        >
          Eliminar usuario
        </button>
      </td>
    </tr>
  );
};

export default UserRow;
