import React from 'react';
import UserRow from '../../Molecules/UserRow/UserRow';

const AdminUsersList = ({ users, setShowConfirmDelete, headers }) => {
  return (
    <table className="min-w-full border border-gray-300">
      <thead>
        <tr>
          {headers.map((header, index) => (
            <th key={index} className="border px-4 py-2 bg-customLighterBlue text-white font-normal">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <UserRow key={user.id} user={user} setShowConfirmDelete={setShowConfirmDelete} />
        ))}
      </tbody>
    </table>
  );
};

export default AdminUsersList;
