import React from 'react'


const Pagination = ({ totalItems, itemsPerPage, onPageChange, currentPage }) => {
  const pageCount = Math.ceil(totalItems / itemsPerPage)
  const pages = [...Array(pageCount).keys()].map(i => i + 1)

  return (
    <div className="flex items-center space-x-2 mt-4">
      <span className='text-gray-500'>Página</span>
      {pages.map(page => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-2  hover:bg-yellow-400 rounded-md ${currentPage === page ? 'bg-yellow-400' : ''}`}
        >
          {page}
        </button>
      ))}
      <span className='text-gray-500'>&gt;&gt;</span>
    </div>
  );
};

export default Pagination
