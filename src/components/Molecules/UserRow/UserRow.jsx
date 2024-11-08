import React from 'react';
import { BiSolidHide } from 'react-icons/bi'
import { FaEdit } from 'react-icons/fa'
import TashCan from '../../../assets/icons/eliminar.png'

const UserRow = ({ user, setShowConfirmDelete }) => {
  const handleDeleteClick = () => {
    setShowConfirmDelete(user.id);
  };

  return (
    <tr className="border-b border-gray-300">
      <td className="px-4 py-2">{user.id}</td>
      <td className="px-4 py-2">{user.nombre} {user.apellido}</td>
      <td className="px-4 py-2">{user.email}</td>
      <td className="px-4 py-2">{user.esAdmin}</td>
      <td className="px-4 py-2">
        <div className='flex space-x-3 justify-center'>
          <button
            className='bg-green-500  text-black px-4 py-2 rounded text-xl'

          >
            <BiSolidHide />
          </button>
          <button
            className=' bg-yellow1 text-black px-4 py-2 rounded  text-lg'

          >
            <FaEdit />
          </button>
          <button
            className='bg-red-500 text-white px-4 py-2 rounded'

          >
            <img src={TashCan} alt='Trashcan' className='w-5 h-5 max-w-none' />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default UserRow;
