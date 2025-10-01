function Pagination({ productsPerPage, totalProducts, currentPage, paginate }) {
  const pageNumbers = [];
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  if (totalPages <= 1) return null;

  let startPage = Math.max(1, currentPage - 2);
  let endPage = Math.min(totalPages, currentPage + 2);

  if (endPage - startPage + 1 < 5) {
    if (startPage === 1) {
      endPage = Math.min(totalPages, 5);
    } else if (endPage === totalPages) {
      startPage = Math.max(1, totalPages - 4);
    }
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="mt-8 flex justify-center">
      <ul className="flex items-center space-x-2">
        <li>
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="rounded-md bg-gray-200 px-3 py-1 text-gray-700 transition-colors hover:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Previous
          </button>
        </li>

        {startPage > 1 && (
          <>
            <li>
              <button
                onClick={() => paginate(1)}
                className="rounded-md bg-gray-200 px-3 py-1 text-gray-700 transition-colors hover:bg-gray-300"
              >
                1
              </button>
            </li>
            {startPage > 2 && <li className="px-3 py-1 text-gray-700">...</li>}
          </>
        )}

        {pageNumbers.map((number) => (
          <li key={number}>
            <button
              onClick={() => paginate(number)}
              className={`rounded-md px-3 py-1 transition-colors ${
                currentPage === number
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {number}
            </button>
          </li>
        ))}

        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && (
              <li className="px-3 py-1 text-gray-700">...</li>
            )}
            <li>
              <button
                onClick={() => paginate(totalPages)}
                className="rounded-md bg-gray-200 px-3 py-1 text-gray-700 transition-colors hover:bg-gray-300"
              >
                {totalPages}
              </button>
            </li>
          </>
        )}

        <li>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="rounded-md bg-gray-200 px-3 py-1 text-gray-700 transition-colors hover:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Pagination;
