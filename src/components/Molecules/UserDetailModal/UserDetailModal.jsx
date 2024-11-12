import React from 'react';

const UserDetailsModal = ({ user, onClose }) => {
  if (!user) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-xl font-semibold mb-4">Detalles del Usuario</h2>
        <ul>
          <li><strong>Nombre:</strong> {user.nombre} {user.apellido}</li>
          <li><strong>DNI:</strong> {user.dni}</li>
          <li><strong>Edad:</strong> {user.edad}</li>
          <li><strong>Teléfono:</strong> {user.telefono}</li>
          <li><strong>Email:</strong> {user.email}</li>
          <li><strong>Nacionalidad:</strong> {user.nacionalidad}</li>
          <li><strong>Es Admin:</strong> {user.esAdmin ? "Sí" : "No"}</li>
          <li><strong>Está Activo:</strong> {user.estaActivo ? "Sí" : "No"}</li>
          <li><strong>Username:</strong> {user.userName}</li>
          <li><strong>Password:</strong> {user.password}</li>
        </ul>
        <button 
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-all"
          onClick={onClose}
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default UserDetailsModal;
