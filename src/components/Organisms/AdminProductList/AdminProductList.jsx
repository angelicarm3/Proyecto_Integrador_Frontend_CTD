import React from 'react'

const AdminProductsList = ({ headers, children }) => {
  console.log(children)
  return (
    <table className='min-w-full border border-gray-300 '>
      <thead>
        <tr>
          {headers.map((header, index) => (
            <th key={index} className='border px-4 py-2 bg-customLighterBlue text-white font-normal'>
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {children}
      </tbody>
    </table>
  )
}

export default AdminProductsList
