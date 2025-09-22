import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = [];

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <nav className="flex justify-center space-x-1 sm:space-x-2 mt-4 overflow-x-auto">
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-2 sm:px-3 py-1.5 sm:py-2 rounded text-xs sm:text-sm min-w-[2rem] ${
            page === currentPage ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          {page}
        </button>
      ))}
    </nav>
  );
};

export default Pagination;
