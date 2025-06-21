import React from "react";

const Pagination = ({ pagination, onPageChange }) => {
  if (!pagination || pagination.last_page === 1) return null;

  const {
    current_page,
    last_page,
    prev_page_url,
    next_page_url,
    links,
  } = pagination;

  const handleClick = (page) => {
    if (page !== current_page) onPageChange(page);
  };
console.log('sss');

  return (
    <div className="flex justify-center mt-6 space-x-2">
      {/* Previous Button */}
      <button
        disabled={!prev_page_url}
        onClick={() => handleClick(current_page - 1)}
        className={`px-3 py-1 border rounded text-sm ${
          prev_page_url ? "hover:bg-gray-100" : "text-gray-400 cursor-not-allowed"
        }`}
      >
        &laquo;
      </button>

      {/* Page Numbers */}
      {links
        .filter((link) => !isNaN(link.label)) // show only numbers
        .map((link, index) => (
          <button
            key={index}
            onClick={() => handleClick(Number(link.label))}
            className={`px-3 py-1 border rounded text-sm ${
              link.active
                ? "bg-blue-500 text-white"
                : "hover:bg-gray-100 text-gray-700"
            }`}
          >
            {link.label}
          </button>
        ))}

      {/* Next Button */}
      <button
        disabled={!next_page_url}
        onClick={() => handleClick(current_page + 1)}
        className={`px-3 py-1 border rounded text-sm ${
          next_page_url ? "hover:bg-gray-100" : "text-gray-400 cursor-not-allowed"
        }`}
      >
        &raquo;
      </button>
    </div>
  );
};

export default Pagination;
