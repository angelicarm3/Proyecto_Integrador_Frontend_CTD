import React from 'react';
import { AiOutlineUserAdd, AiOutlineUserDelete } from 'react-icons/ai';
import { FaEdit } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { setSelectedUser } from '../../../context/slices/adminUserSlice';
import './UserRow.css';

const UserRow = ({ user, setShowConfirmDelete }) => {
  const dispatch = useDispatch();

  // Función para otorgar permisos de administrador
  const handleGrantAdmin = () => {
    console.log(`Otorgar permisos a ${user.name}`);
    // Aquí puedes agregar lógica para actualizar el rol a 'admin'
  };

  // Función para quitar permisos de administrador
  const handleRevokeAdmin = () => {
    console.log(`Quitar permisos a ${user.name}`);
    // Aquí puedes agregar lógica para actualizar el rol a 'usuario'
  };

  // Función para editar el usuario
  const handleEdit = () => {
    console.log(`Editar usuario ${user.name}`);
    // Aquí puedes redirigir o abrir un formulario de edición
  };

  // Función para eliminar el usuario
  const handleDelete = () => {
    console.log(`Eliminar usuario ${user.id}`);
    dispatch(setSelectedUser(user));  // Establecer el usuario completo
    setShowConfirmDelete(true);  // Activar la confirmación de eliminación
  };

  return (
    <tr>
      <td className='border px-4 py-2 text-center'>{user.id}</td>
      <td className='border px-4 py-2'>{user.name}</td>
      <td className='border px-4 py-2'>{user.email}</td>
      <td className='border px-4 py-2 text-center'>{user.isAdmin ? 'Administrador' : 'Usuario'}</td>
      <td className='border px-4 py-2 w-1/4'>
        <div className='flex space-x-3 justify-center'>
          {/* Botón para cambiar rol a admin */}
          {user.isAdmin ? (
            <button
              className='bg-red-500 text-white px-4 py-2 rounded text-xl'
              onClick={handleRevokeAdmin}
            >
              <AiOutlineUserDelete size={20} />
            </button>
          ) : (
            <button
              className='bg-green-500 text-black px-4 py-2 rounded text-xl'
              onClick={handleGrantAdmin}
            >
              <AiOutlineUserAdd size={20} />
            </button>
          )}

          {/* Botón para editar */}
          <button
            className='bg-yellow-500 text-black px-4 py-2 rounded text-lg'
            onClick={handleEdit}
          >
            <FaEdit />
          </button>

          {/* Botón para eliminar */}
          <button
            className='bg-red-500 text-white px-4 py-2 rounded'
            onClick={handleDelete}
          >
            <img src='/path/to/delete-icon.png' alt='Eliminar' className='w-5 h-5 max-w-none' />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default UserRow;
