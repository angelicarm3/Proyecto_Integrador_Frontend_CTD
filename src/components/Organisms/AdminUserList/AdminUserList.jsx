import React from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { setSelectedUser } from '../../../context/slices/adminUserSlice';

const AdminUserList = ({ users, headers, setShowConfirmDelete }) => {
  const dispatch = useDispatch();

  const handleDeleteClick = (user) => {
    
    dispatch(setSelectedUser(user));
    setShowConfirmDelete(true);
  };

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
      <table className="min-w-full table-auto">
        <thead>
          <tr className="bg-gray-200">
            {headers.map((header, index) => (
              <th key={index} className="px-6 py-3 text-left text-gray-700 font-semibold">{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan={headers.length} className="px-6 py-4 text-center text-gray-500">No hay usuarios disponibles</td>
            </tr>
          ) : (
            users.map((user) => (
              <tr key={user.id} className="border-t hover:bg-gray-50">
                <td className="px-6 py-4 text-gray-800">{user.id}</td>
                <td className="px-6 py-4 text-gray-800">{user.name}</td>
                <td className="px-6 py-4 text-gray-800">{user.email}</td>
                <td className="px-6 py-4 text-gray-800">{user.role}</td>
                <td className="px-6 py-4 flex space-x-3">
                  <button
                    onClick={() => handleDeleteClick(user)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <AiOutlineDelete size={20} />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUserList;
