import React from 'react';

const UserRow = ({ user, setShowConfirmDelete }) => {
  const handleDeleteClick = () => {
    setShowConfirmDelete(user.id);
  };

  return (
    <tr className="border-b border-gray-300">
      <td className="px-4 py-2">{user.name}</td>
      <td className="px-4 py-2">{user.email}</td>
      <td className="px-4 py-2">{user.role}</td>
      <td className="px-4 py-2">
        <button
          className="text-red-500 hover:text-red-700"
          onClick={handleDeleteClick}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default UserRow;
